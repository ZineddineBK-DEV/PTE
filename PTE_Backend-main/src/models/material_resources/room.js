const mongoose = require("mongoose");
const RoomSchema = mongoose.Schema({
  label: { type: String, required: true },
  location: { type: String, required: true },
});
module.exports = mongoose.model("Room", RoomSchema);
