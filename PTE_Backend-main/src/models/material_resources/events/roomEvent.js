const mongoose = require("mongoose");
const RoomEventSchema = mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAccepted: { type: Boolean, required: true, default: false },
});
module.exports = mongoose.model("RoomEvent", RoomEventSchema);
