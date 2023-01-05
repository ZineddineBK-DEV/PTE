const { ObjectId } = require("mongodb");
const User = require("../../models/user");

const UserPlan = require("../../models/technical_team/userPlan");
// create event
module.exports.uploadPlan = async function (req, res) {
    try {
      //upload
      const body = {  
      user:req.body.user,
       pdf:req.body.pdf,
      };
      if (
        res.locals.user.roles.includes("admin") ){
        body.isAccepted = true;
      }
      const event = await UserPlan.create({ ...body });
      if (event) {
        res.status(200).json(event);
      }
       } catch (error) {
    res.status(500).json(error);
  }
  
};

/** get events by UserID*/
// module.exports.getPlanById = async function (req, res) {
//   const ID = req.query.user;
// console.log(ID);
// console.log(req.body);
//   if (!ObjectId.isValid(ID)) {
//     return res.status(404).json("ID is not valid");
//   }
//   try {
//     //if connected user is admin
//     if (res.locals.user.roles.includes("admin")) {
//       const events = await UserPlan.findOne({
//         user: ID,
//        pdf:req.query.pdf,
//       }).populate({ path: "user", select: "fullName image" });

//       if (events) {
//         res.status(200).json(events);
//       }
//     }
//   } catch (error) {
//     res.status(404).json("there is an error ");
//   }
// };

module.exports.getPlanById = async function (req, res) {
  const ID = req.params.id;
console.log(req.params);

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const userPlan = await UserPlan.find({ user: req.params.id });
    console.log(userPlan);
    res.status(200).json(userPlan);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

