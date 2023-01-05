const mongoose = require("mongoose");
const VirtualizationEnvSchema = mongoose.Schema({
  label: { type: String, required: true },
});
module.exports = mongoose.model("VirtualizationEnv", VirtualizationEnvSchema);
