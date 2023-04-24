const { ObjectId } = require("mongodb");
const User = require("../models/user");

const Roles = require("../models/roles");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const ForgetPassword = require("../models/forgotPassword");
const Cv = require("../models/cv");
const Career = require("../models/career");
const VehicleEvent = require("../models/material_resources/events/vehicleEvent");
const RoomEvent = require("../models/material_resources/events/roomEvent");
const UserEvent = require("../models/technical_team/userEvent");

const nodemailer = require("nodemailer");
const moment = require("moment");
const UserPlan = require("../models/technical_team/userPlan");

function setUserTitle(experience) {
  /* Check experience years and set a title for the Employee*/
  if (experience <= 1) {
    return "Junior";
  } else if (experience === 2) {
    return "Junior+";
  } else if (experience === 3) {
    return "Junior++";
  } else if (experience === 4 && experience === 5) {
    return "Senior-";
  } else if (experience >= 5 && experience < 10) {
    return "Senior";
  } else {
    return "Architect";
  }
}

module.exports.AddUser = async function (req, res, next) {
  const body = { ...req.body };

  body.image = req.file.image;

  try {
   
    const user = await User.create({ ...body });
    const cv = await Cv.create({ user: user._id });

    if (moment().diff(moment(body.hiringDate), "months") >= 6) {
      const _user = await User.findByIdAndUpdate(user._id, {
        cv: cv._id,
      });
      if (_user && cv) {
        res.status(200).json({
          message:
            "External added",
          user: _user,
        });
      }
    } 
      
    
  } catch (error) {
    res.status(500).json(error);
  }
};



module.exports.signUp = async function (req, res, next) {
  const body = { ...req.body };
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send('Email already exists');}
if (req.file){
  body.image = req.file.filename;
}
  try {
    hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    body.roles = [Roles.Engineer];
    body.title = setUserTitle(body.experience);

    const user = await User.create({ ...body });
    const cv = await Cv.create({ user: user._id });
    const plan = await UserPlan.create({ user: user._id });

    

    if (moment().diff(moment(body.hiringDate), "months") >= 6) {
      const _user = await User.findByIdAndUpdate(user._id, {
        cv: cv._id,
        plan :plan.id,
      });
      if (_user && cv && plan) {
        res.status(200).json({
          message:
            "Signup request sent succefully , waiting for admin confirmation",
          user: _user,
        });
      }
    } else {
      /** Create a user with career object*/
      const career = await Career.create({ user: user._id });
      const _user = await User.findByIdAndUpdate(user._id, {
        cv: cv._id,
        career: career,
        plan : plan,
      });
      if (_user && cv && career && plan) {
        res.status(200).json({
          message:
            "Signup request sent succefully , waiting for admin confirmation",
          user: _user,
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.login = async function (req, res, next) {
  try {
    let fetchedUser = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!fetchedUser) {
      return res.status(404).json({ message: "Wrong Email or Password" });
    }

    if (!fetchedUser.isEnabled) {
      return res.status(500).json({
        message: "Unauthorised login. Waiting for register confirmation ",
      });
    }
    var result = await bcrypt.compare(req.body.password, fetchedUser.password);
    if (!result) {
      return res.status(500).json({ message: "Wrong email or password" });
    }
    const token = jwt.sign(
      {
        email: fetchedUser.email,
        _id: fetchedUser._id,
        roles : fetchedUser.roles
      },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      token: token,
      expiresIn: 6000,
      userName: fetchedUser.fullName,
      image: fetchedUser.image,
      _id: fetchedUser._id,
      roles: fetchedUser.roles,
    });
  } catch (error) {
    return res.status(500).json({ message: "problem in bycript" });
  }
};

module.exports.checkPassword = async function (req, res, next) {
  try {
    let fetchedUser = await User.findById(req.body.id);

    var result = await bcrypt.compare(req.body.password, fetchedUser.password);
    if (!result) {
      return res.status(500).json("wrong password");
    }

    return res.status(200).json("ok");
  } catch (error) {
    return res.status(500).json({ message: "problem in bycript" });
  }
};

module.exports.updateUserRoles = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  const body = { ...req.body };
  console.log(body);
  var userRoles = [];

  body.roles.forEach((role) => {
    if (role === "sales_assistant") {
      userRoles.push(Roles.sales_assistant);
    }
    if (role === "virt_manager") {
      userRoles.push(Roles.virt_manager);
    }
    if (role === "engineer") {
      userRoles.push(Roles.Engineer);
    }
  });
  console.log(userRoles);
  User.findByIdAndUpdate(ID, { $set: { roles: userRoles } })
    .then(() => {
      res.status(200).json("roles updates");
    })
    .catch((error) => res.status(500).json(error));
};

module.exports.UpdateUser = async function (req, res, next) {
  const body = { ...req.body };

  if (req.file) {
    body.image = req.file.filename;
  }
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }

  if (body.password) {
    try {
      body.password = await bcrypt.hash(body.password, 10);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  if (body.experience) {
    body.title = setUserTitle(body.experience);
  }

  User.findByIdAndUpdate(ID, { $set: body })
    .then((result) => {
      User.findById(ID)
        .populate("cv")
        .then((user) => {
          return res.status(200).json(user);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

module.exports.forgotPassword = async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const code = Math.floor(Math.random() * 111111);
    await ForgetPassword.findOneAndDelete({ email: user.email });
    let forgetPassword = new ForgetPassword({
      email: req.body.email,
      code: code,
    });

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
      subject: "Prologic -- Verification code for changing password",
      text: "This is your verification code for changing password : " + code,
    });

    forgetPassword.save();
    return res.status(200).json(forgetPassword);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports.validateCode = async function (req, res) {
   try {
     let forgetPassword = await ForgetPassword.findOne({
       email: req.body.email,
     });

     if (forgetPassword.code === req.body.code) {
       return res.status(200).json({ id: forgetPassword._id });
     } else {
      return res.status(500).json({ message: "Unauthorized" });
    }
   } catch (error) {
     return res.status(500).json(error);
   }
};

module.exports.changePswdAutorisation = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const forgotPassword = await ForgetPassword.findById(ID);
    if (forgotPassword) {
      res.status(200).json("ok");
    } else {
      res.status(401).json("error");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports.changePswd = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  const body = { ...req.body };

  try {
    body.password = await bcrypt.hash(body.password, 10);
    await User.findOneAndUpdate({ email: body.email }, { $set: body });
    await ForgetPassword.findByIdAndDelete(ID);
    res.status(200).json("password updated");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.confirmSignUp = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }

  const user =await  User.findByIdAndUpdate(ID, { isEnabled: true });
  // if (user) {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     port: 587,
  //     auth: {
  //       user: "prologic.simop@gmail.com",
  //       pass: "mepdngigwccwxwog",
  //     },
  //   });
  //   transporter.sendMail({
  //     from: "prologic.simop@gmail.com",
  //     to: user.email,
  //     subject: "Prologic -- register request accepted",
  //     text: "Your register request is accepted",
  //   });
  // }

  return res.status(200).json({ message: "User accepted" });
};

module.exports.getAllUsers = async function (req, res) {
  User.find({
    $and: [
      { isEnabled: true },
      { _id: { $ne: req.user._id } },
      { roles: { $ne: "admin" } },
    ],
  })
    .select("-password")
    .populate("cv", "skills")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(404).json({ message: error }));
};

module.exports.getSignUpRequests = async function (req, res) {
  User.find({ isEnabled: false })
    .select("-password")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(404).json({ message: error }));
};

module.exports.deleteUser = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const user = await User.findByIdAndRemove({ _id: ID });
    if (user) {
      await VehicleEvent.deleteMany({
        $or: [{ applicant: user._id }, { driver: user._id }],
      });
      await Cv.findByIdAndRemove(user.cv._id);
      if (user.career) {
        await Career.findByIdAndRemove(user.career._id);
      }
      await RoomEvent.deleteMany({
        applicant: user._id,
      });
      await UserEvent.deleteMany({
        $or: [
          {
            applicant: user._id,
            engineer: user._id,
          },
        ],
      });
    }
    res.status(200).json({ message: "User deleted succefully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.getUserById = async function (req, res) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const user = await User.findById(ID).populate("cv");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.filterUsers = async function (req, res) {
  var fullNameFilter = req.body.fullName;
  var titleFilter = req.body.title;
  var driversFilter = req.body.drivingLicense;
  var departmentFilter = req.body.department;
  var pathsFilter = req.body.paths;
  if (fullNameFilter) {
    fullNameFilter = fullNameFilter.trim().length === 0 ? null : fullNameFilter;
  }
  if (titleFilter) {
    titleFilter = titleFilter.trim().length === 0 ? null : titleFilter;
  }
  if (driversFilter) {
    driversFilter = driversFilter.trim().length === 0 ? null : driversFilter;
  }
  if (departmentFilter) {
    departmentFilter =
      departmentFilter.trim().length === 0 ? null : departmentFilter;
  }
  if (pathsFilter) {
    pathsFilter = pathsFilter.trim().length === 0 ? null : pathsFilter;
  }

  try {
    if (driversFilter) {
      const users = await User.find({
        roles: { $ne: "admin" },
        drivingLicense: true,
        isEnabled: true,
      })
        .populate("cv")
        .populate("career")
        .select(pathsFilter);
      if (users) {
        res.status(200).json(users);
      }
    } else {
      const users = await User.find({
        $and: [
          { roles: { $ne: "admin" } },
          { _id: { $ne: res.locals.user._id } },
          { isEnabled: true },
          {
            $or: [
              {
                fullName: fullNameFilter
                  ? new RegExp(fullNameFilter, "i")
                  : new RegExp("[a-zA-Z]"),
              },
              {
                title: titleFilter
                  ? new RegExp(titleFilter, "i")
                  : new RegExp("[a-zA-Z]"),
              },
              {
                department: departmentFilter
                  ? new RegExp(departmentFilter, "i")
                  : new RegExp("[a-zA-Z]"),
              },
            ],
          },
        ],
      })
        .populate("cv")
        .populate("career")
        .select(pathsFilter);
      if (users) {
        res.status(200).json(users);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.searchUsers = async function (req, res) {
  var fullNameFilter = req.body.fullName;
  var addressFilter = req.body.address;
  var titleFilter = req.body.title;
  var departmentFilter = req.body.department;
  var isNotEnabledFilter = req.body.isEnabled;
  var pathsFilter = req.body.paths;
  if (fullNameFilter) {
    fullNameFilter = fullNameFilter.trim().length === 0 ? null : fullNameFilter;
  }
  if (titleFilter) {
    titleFilter = titleFilter.trim().length === 0 ? null : titleFilter;
  }

  if (departmentFilter) {
    departmentFilter =
      departmentFilter.trim().length === 0 ? null : departmentFilter;
  }
  if (addressFilter) {
    addressFilter = addressFilter.trim().length === 0 ? null : addressFilter;
  }
  if (isNotEnabledFilter) {
    isNotEnabledFilter =
      isNotEnabledFilter.trim().length === 0 ? null : isNotEnabledFilter;
  }
  if (pathsFilter) {
    pathsFilter = pathsFilter.trim().length === 0 ? null : pathsFilter;
  }

  try {
    const users = await User.find({
      roles: { $ne: "admin" },
      isEnabled: isNotEnabledFilter ? false : true,
      _id: { $ne: res.locals.user._id },
      fullName: fullNameFilter
        ? new RegExp(fullNameFilter, "i")
        : new RegExp("[a-zA-Z]"),

         title: titleFilter
        ? new RegExp(titleFilter, "i")
        : new RegExp("[a-zA-Z]"),
      address: addressFilter
        ? new RegExp(addressFilter, "i")
        : new RegExp("[a-zA-Z]"),

      department: departmentFilter
        ? new RegExp(departmentFilter, "i")
        : new RegExp("[a-zA-Z]"),
    })
      .populate("cv")
      .populate("career")
      .select(pathsFilter);
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

