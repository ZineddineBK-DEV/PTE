const mongoose = require("mongoose");
const VehicleEventSchema = mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  destination: { type: String, required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAccepted: { type: Boolean, required: true, default: false },
});
module.exports = mongoose.model("VehicleEvent", VehicleEventSchema);
