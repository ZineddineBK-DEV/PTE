const mongoose = require("mongoose");
const UserEventSchema = mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  engineer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  job: { type: String, required: true },
  address: { type: String, required: true },
  pdf:{type:String, default:""},
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAccepted: { type: Boolean, required: true, default: false },
});
module.exports = mongoose.model("UserEvent", UserEventSchema);
