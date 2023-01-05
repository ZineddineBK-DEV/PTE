const { ObjectId } = require("mongodb");
const User = require("../../models/user");

const UserEvent = require("../../models/technical_team/userEvent");
const nodemailer = require("nodemailer");


// create event
module.exports.createEvent = async function (req, res) {
  try {
    const eventExist = await UserEvent.find({
      start: { $gte: req.body.start },
      end: { $lte: req.body.end },
      engineer: req.body.engineer,
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
        engineer: req.body.engineer,
        job: req.body.job,
        address: req.body.address,
        applicant: req.body.applicant,
        
      };

      if (
        res.locals.user.roles.includes("admin") ||
        body.applicant === body.engineer
      ) {
        body.isAccepted = true;
      }

      const event = await UserEvent.create({ ...body });
      if (event) {
        const user = await User.findOne({ email: req.body.email });

               //send mail to user
               const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                auth: {
                  user: "prologic.simop@gmail.com",
                  pass: "mepdngigwccwxwog",
                },
              });
              transporter.sendMail({
                from: "prologic.simop@gmail.com",
                to: user.email,
                subject: "Prologic -- Reservation",
                text: "You Are Reserved And This is your JOB : " + job,
              });          
    res.status(200).json(event);
      }
      }
       } catch (error) {
    res.status(500).json(error);
  }
};

/** get events by UserID*/
module.exports.getUserEvents = async function (req, res) {
  const ID = req.query.engineer;
    console.log(ID);

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    //if connected user is admin
    if (res.locals.user.roles.includes("admin")) {
      const events = await UserEvent.find({
        engineer: ID,
        start: { $gte: req.query.start },
        end: { $lte: req.query.end },
      }).populate({ path: "applicant", select: "fullName image" });

      if (events) {
        res.status(200).json(events);
      }
    } else {
      //connected user is not admin=> cannot display unconfirmed events of other users

      const events = await UserEvent.find({
        $and: [
          { engineer: ID },
          { start: { $gte: req.query.start } },
          { end: { $lte: req.query.end } },

          {
            $or: [
              {
                $and: [
                  { isAccepted: false },
                  {
                    $or: [
                      { applicant: res.locals.user._id },
                      { engineer: res.locals.user._id },
                    ],
                  },
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
      const event = await UserEvent.findById(ID);

      //check if there is a conflict (to assure that there  is no conflicts)
      const checkExist = await UserEvent.find({
        start: { $gte: event.start },
        end: { $lte: event.end },
        engineer: event.engineer,
        isAccepted: true,
      });

      if (checkExist.length > 0) {
        return res.status(500).json("Dates already reserved");
      }
      //Accept Event
      const accept = await UserEvent.findByIdAndUpdate(ID, {
        isAccepted: true,
      });

      // delete non-confirmed events that are in conflict with the accepted event
      await UserEvent.deleteMany({
        engineer: event.engineer,
        start: { $gte: event.start },
        end: { $gte: event.end },
        isAccepted: false,
      });

      if (accept) return res.status(200).json(accept);
    }
  } catch (error) {
    res.status(501).json(error);
  }
};

/**deleteEvent */
module.exports.deleteEvent = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const event = await UserEvent.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Upload PDF
// module.exports.upload = async function (req, res, next) {
//   const body = { ...req.body };

//   body.pdf = req.file.filename;

//   try {
//       const userEvent = await UserEvent.findOneAndUpdate({ ...body });
//     const ID =  userEvent._id ;
//       const _user = await UserEvent.findByIdAndUpdate(userEvent._id, {
//         ID: userEvent._id,
//       });
//       if (_user && ID) {
//         res.status(200).json({
//           message:
//             "File upload succefully",
//           user: _user,
//         });
//       }
    
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };