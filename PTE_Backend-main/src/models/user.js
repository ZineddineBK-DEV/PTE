const mongoose = require("mongoose");
const Roles = require("./roles");

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already in use"],
  },
  password: { type: String, required: true },

  roles: [
    {
      type: String,
      enum: Object.values(Roles),
    },
  ],
  image: { type: String },
  nationality: { type: String  },
  familySituation: { type: String},
  DateOfBirth: { type: Date},
  address: { type: String},
  department: { type: String},
  drivingLicense: { type: Boolean },
  gender: { type: String },
  isEnabled: { type: Boolean, default: false },
  experience: { type: Number, default: 0 },
  hiringDate: { type: Date},
  title: { type: String, default: "" },
  cv: { type: mongoose.Schema.Types.ObjectId, ref: "Cv" },
  career: { type: mongoose.Schema.Types.ObjectId, ref: "Career" },

});

Object.assign(UserSchema.statics, {
  Roles,
});

module.exports = mongoose.model("User", UserSchema);
