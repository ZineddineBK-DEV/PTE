const { ObjectId } = require("mongodb");
const User = require("../models/user");
const Cv = require("../models/cv");

module.exports.updateCv = function (req, res, next) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  const body = { ...req.body };
  if (body.skills) {
    Cv.findByIdAndUpdate(ID, { $set: body })
      .then((res) => {
        res.status(200).json(res);
        console.log(res);
      })
      .catch((err) => res.status(500).json(err));
  } else {
    Cv.findByIdAndUpdate(ID, { $push: body })
      .then((res) => {
        res.status(200).json(res);
      })
      .catch((err) => res.status(500).json(err));
  }
};

module.exports.deleteElement = function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }

  Cv.findByIdAndUpdate(ID, { $pull: req.body })
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => res.status(500).json(err));
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
