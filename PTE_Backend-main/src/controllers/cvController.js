const { ObjectId } = require("mongodb");
const User = require("../models/user");
const Cv = require("../models/cv");


module.exports.updateCv = function (req, res, next) {

  const ID = req.params.id;
  console.log(ID)
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  const body = { ...req.body };
  console.log(body)
  // if (body.skills) {
  //   Cv.findByIdAndUpdate(ID, { $set: body })
  //     .then((res) => {
  //       res.status(200).json(res);
  //       console.log(res);
  //     })
  //     .catch((err) => res.status(500).json(err));
  // } else {
  Cv.findByIdAndUpdate(ID, { $push: body })
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => res.status(500).json(err));
  // }
};

// module.exports.deleteElement = function (req, res) {
//   const ID = req.params.id;
//   console.log("this id :",ID)
//   if (!ObjectId.isValid(ID)) {
//     return res.status(404).json("ID is not valid");
//   }

//   Cv.findByIdAndUpdate(ID, { $pull: req.body })
//     .then((res) => {
//       res.status(200).json(res);
//     })
//     .catch((err) => res.status(500).json(err));
// };

module.exports.deleteElement = async function (req, res) {
  
  const { id, arrayName, itemId } = req.params;
  Cv.updateOne(
    { _id: id },
    { $pull: { [arrayName]: { _id: itemId } } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to delete item" });
    });
};


module.exports.filterCvs = async function (req, res) {
  var skillsFilter = req.body.skills;
 
  if (skillsFilter) {
    skillsFilter = skillsFilter.trim().length === 0 ? null : skillsFilter;
  }
  try {
    if (skillsFilter) {
      const cvs = await Cvs.skills.find({
        roles: { $ne: "admin" },
        isEnabled: isNotEnabledFilter ? false : true,
        _id: { $ne: res.locals.user._id },
      skillsFilter : req.body.skills,
      })
      .select(skillsFilter);

     if (cvs) {
        res.status(200).json(cvs);
      }
    } 
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.searchCvs = async function (req, res) {
  var skillsFilter = req.body.skills;

  if (skillsFilter) {
    skillsFilter = skillsFilter.trim().length === 0 ? null : skillsFilter;
  }
  try {
    const cvs = await Cvs.skills.find({
      roles: { $ne: "admin" },
      isEnabled: isNotEnabledFilter ? false : true,
      _id: { $ne: res.locals.user._id },
     
      skills: skillsFilter
        ? new RegExp(skillsFilter, "i")
        : new RegExp("[a-zA-Z]"),
    })
      .select(skillsFilter);
    if (cvs) {
      res.status(200).json(cvs);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
