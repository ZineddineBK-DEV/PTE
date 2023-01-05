const { ObjectId } = require("mongodb");
const SousTraitant = require("../../models/material_resources/SousTraitant");
const SousTraitantEvent = require("../../models/material_resources/events/SousTraitantEvent");
/** Add sousTraitant */
module.exports.addSousTraitant = async function (req, res) {
  try {
    const body = { ...req.body };
    const sousTraitant = await SousTraitant.create({ ...body });
    if (sousTraitant) {
      res.status(200).json(sousTraitant);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
/** Delete sousTraitant */
module.exports.deleteSousTraitant = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const sousTraitant = await SousTraitant.findByIdAndDelete(ID);
    if (sousTraitant) {
      await SousTraitantEvent.deleteMany({ sousTraitant: sousTraitant._id });
    }
    res.status(200).json(sousTraitant);
  } catch (error) {
    res.status(500).json(error);
  }
};
/** getAllSousTraitants  */
module.exports.getAllSousTraitant = async function (req, res, next) {
  try {
    const sousTraitants = await SousTraitant.find();
    res.status(200).json(sousTraitants);
  } catch (error) {
    res.status(500).json("internal server error: " + error.message);
  }
};

/**Seach a sousTraitant by type or registration number */
module.exports.searchSousTraitant = async function (req, res) {
  try {
    const sousTraitants = await SousTraitant.find({
      $or: [
        {
          type: new RegExp(req.query.text, "i"),
        },
        {
          registration_number: new RegExp(req.query.text, "i"),
        },
      ],
    });
    res.status(200).json(sousTraitants);
  } catch (error) {
    res.status(404).json(error);
  }
};

/*******************************************************/
/***Events managment */
/*******************************************************/
module.exports.createEvent = async function (req, res) {
  try {
    const eventExist = await SousTraitantEvent.find({
      fullName: { $gte: req.body.fullName },
      email: { $lte: req.body.email },
      sousTraitant: req.body.sousTraitant,
      isAccepted: true,
    });

    // if dates are  already reserved
    if (eventExist.length > 0) {
      return res.status(500).json("Dates already reserved");
    } else {
      // if dates are free to reserve => create event
      const body = {
        fullName: req.body.fullName,
        email: req.body.email,
        cv: req.body.cv,
       
      };

      if (res.locals.user.roles.includes("admin")) {
        body.isAccepted = true;
      }
      const event = await SousTraitantEvent.create({ ...body });
      if (event) {
        res.status(200).json(event);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
/** get events by sousTraitant ID*/
module.exports.getSousTraitantEvents = async function (req, res) {
  const ID = req.query.sousTraitant;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }

  try {
    //if connected user is admin
    if (res.locals.user.roles.includes("admin")) {
      const events = await SousTraitantEvent.find({
        sousTraitant: ID,
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
      const events = await SousTraitantEvent.find({
        $and: [
          { sousTraitant: ID },
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
      const event = await SousTraitantEvent.findById(ID);

      //check if there is a conflict (to assure that there is no conflicts)
      const checkExist = await SousTraitantEvent.find({
        fullName: { $gte: event.start },
        email: { $lte: event.email },
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
      await SousTraitantEvent.deleteMany({
        sousTraitant: event.room,
        fullName: { $gte: event.fullName },
        email: { $gte: event.email },
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
    const event = await SousTraitantEvent.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json(error);
  }
};
