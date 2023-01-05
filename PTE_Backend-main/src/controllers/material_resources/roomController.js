const { ObjectId } = require("mongodb");
const Room = require("../../models/material_resources/room");
const RoomEvent = require("../../models/material_resources/events/roomEvent");

/** Add Room */
module.exports.addRoom = async function (req, res, next) {
  try {
    const body = { label: req.body.label, location: req.body.location };
    const room = await Room.create({ ...body });
    if (room) {
      res.status(200).json(room);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
/** Delete Room */
module.exports.deleteRoom = async function (req, res, next) {
  try {
    const room = await Room.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json(error);
  }
};
/** getAllRooms  */
module.exports.getAllRooms = async function (req, res) {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**Seach a room by label or location */
module.exports.searchRoom = async function (req, res) {
  try {
    const rooms = await Room.find({
      $or: [
        {
          label: new RegExp(req.query.text, "i"),
        },
        {
          location: new RegExp(req.query.text, "i"),
        },
      ],
    });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json(error);
  }
};

/*******************************************************/
/***Events managment */
/*******************************************************/
module.exports.createEvent = async function (req, res) {
  try {
    const eventExist = await RoomEvent.find({
      start: { $gte: req.body.start },
      end: { $lte: req.body.end },
      room: req.body.room,
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
        room: req.body.room,
        applicant: req.body.applicant,
      };
      if (res.locals.user.roles.includes("admin")) {
        body.isAccepted = true;
      }
      const event = await RoomEvent.create({ ...body });
      if (event) {
        res.status(200).json(event);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/** get events by room ID*/
module.exports.getRoomEvents = async function (req, res) {
  const ID = req.query.room;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    //if connected user is admin
    if (res.locals.user.roles.includes("admin")) {
      const events = await RoomEvent.find({
        room: ID,
        start: { $gte: req.query.start },
        end: { $lte: req.query.end },
      }).populate({ path: "applicant", select: "fullName image" });

      if (events) {
        res.status(200).json(events);
      }
    } else {
      //connected user is not admin=> cannot display unconfirmed events of other users

      const events = await RoomEvent.find({
        $and: [
          { room: ID },
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
      }).populate({ path: "applicant", select: "fullName image" });

      if (events) {
        res.status(200).json(events);
      }
    }
  } catch (error) {
    res.status(404).json("there is an error ");
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
      const event = await RoomEvent.findById(ID);

      //check if there is a conflict (to assure that there  is no conflicts)
      const checkExist = await RoomEvent.find({
        start: { $gte: event.start },
        end: { $lte: event.end },
        room: event.room,
        isAccepted: true,
      });

      if (checkExist.length > 0) {
        return res.status(500).json("Dates already reserved");
      }
      //Accept Event
      const accept = await RoomEvent.findByIdAndUpdate(ID, {
        isAccepted: true,
      });

      // delete non-confirmed events that are in conflict with the accepted event
      await RoomEvent.deleteMany({
        room: event.room,
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
    const event = await RoomEvent.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json(error);
  }
};
