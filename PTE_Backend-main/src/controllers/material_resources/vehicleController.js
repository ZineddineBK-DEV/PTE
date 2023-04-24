const { ObjectId } = require("mongodb");
const Vehicle = require("../../models/material_resources/vehicle");
const VehicleEvent = require("../../models/material_resources/events/vehicleEvent");



/** Add Vehicle */
module.exports.addVehicle = async function (req, res) {
  try {
    const body = { ...req.body };
    const Exists = await Vehicle.findOne({ registration_number: req.body.registration_number });
  if (Exists) {
    return res.status(400).send('Registration number already exists');}
    const vehicle = await Vehicle.create({ ...body });
    if (vehicle) {
      res.status(200).json(vehicle);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/** Delete Vehicle */
module.exports.deleteVehicle = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const vehicle = await Vehicle.findByIdAndDelete(ID);
    if (vehicle) {
      await VehicleEvent.deleteMany({ vehicle: vehicle._id });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json(error);
  }
};
/** update vehicle  */
module.exports.UpdateVehicle = async function(req, res, next) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json('ID is not valid');
  }
  const Exists = await Vehicle.findOne({ registration_number: req.body.registration_number });
  if (Exists) {
    return res.status(400).send('Registration number already exists');}

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      ID,
      {
        model: req.body.model,
        registration_number: req.body.registration_number,
        type: req.body.type,
      },
      { new: true } // return the updated document
    );

    if (!updatedVehicle) {
      return res.status(404).json('Vehicle not found');
    }

    return res.json(updatedVehicle);
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server error');
  }
};


/** getAllVehicles  */
module.exports.getAllVehicles = async function (req, res, next) {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json("internal server error: " + error.message);
  }
};

/**Seach a vehicle by type or registration number */
module.exports.searchVehicle = async function (req, res) {
  try {
    const vehicles = await Vehicle.find({
      $or: [
        {
          model: new RegExp(req.query.text, "i"),
        },
        {
          registration_number: new RegExp(req.query.text, "i"),
        },
        {
          type: new RegExp(req.query.text, "i"),
        },
      ],
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(404).json(error);
  }
};

/*******************************************************/
/***Events managment */
/*******************************************************/
module.exports.createEvent = async function (req, res) {
  try {
    const eventExist = await VehicleEvent.find({
      start: { $gte: req.body.start },
      end: { $lte: req.body.end },
      vehicle: req.body.vehicle,
      isAccepted: true,
    });

    // if dates are  already reserved
    if (eventExist.length > 0) {
      return res.status(500).json("Dates already reserved");
    } else {
      // if dates are free to reserve => create event
      const body = {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        vehicle: req.body.vehicle,
        applicant: req.body.applicant,
        driver: req.body.driver,
        destination: req.body.destination,
      };

      if (res.locals.user.roles.includes("admin")) {
        body.isAccepted = true;
      }
      const event = await VehicleEvent.create({ ...body });
      if (event) {
        res.status(200).json(event);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
/** get events by vehicle ID*/
module.exports.getVehicleEvents = async function (req, res) {
  const ID = req.query.vehicle;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }

  try {
    //if connected user is admin
    if (res.locals.user.roles.includes("admin")) {
      const events = await VehicleEvent.find({
        vehicle: ID,
        start: { $gte: req.query.start },
        end: { $lte: req.query.end },
      })
        .populate({ path: "driver", select: "fullName image -_id" })
        .populate({ path: "applicant", select: "fullName image" });
      if (events) {
        res.status(200).json(events);
      }
    } else {
      //connected user is not admin=> cannot display unconfirmed events of other users
      const events = await VehicleEvent.find({
        $and: [
          { vehicle: ID },
          { start: { $gte: req.query.start } },
          { end: { $lte: req.query.end } },

          {
            $or: [
              {
                $and: [
                  { isAccepted: false },
                  { applicant: res.locals.user._id },
                ],
              },
              { isAccepted: true },
            ],
          },
        ],
      })
        .populate({ path: "driver", select: "fullName image -_id" })
        .populate({ path: "applicant", select: "fullName image" });
      if (events) {
        res.status(200).json(events);
      } else {
        res.status(500).json(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/**Update Event  */
module.exports.updateEvent = async function (req, res) {
  const ID = req.params.id;
  const body = { ...req.body };
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    if (body.isAccepted) {
      const event = await VehicleEvent.findById(ID);

      //check if there is a conflict (to assure that there is no conflicts)
      const checkExist = await VehicleEvent.find({
        start: { $gte: event.start },
        end: { $lte: event.end },
        room: event.room,
        isAccepted: true,
      });

      if (checkExist.length > 0) {
        return res.status(500).json("Dates already reserved");
      }
      //Accept Event
      const accept = await VehicleEvent.findByIdAndUpdate(ID, {
        isAccepted: true,
      });

      // delete non-confirmed events that are in conflict with the accepted event
      await VehicleEvent.deleteMany({
        vehicle: event.room,
        start: { $gte: event.start },
        end: { $gte: event.end },
        isAccepted: false,
      });

      if (accept) return res.status(200).json(accept);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/**deleteEvent */
module.exports.deleteEvent = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const event = await VehicleEvent.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json(error);
  }
};
