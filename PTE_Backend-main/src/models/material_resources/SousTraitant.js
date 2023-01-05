const mongoose = require("mongoose");


const SousTraitantSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: {type: String,required: true},
  cv: { type: String, required: true },
});

module.exports = mongoose.model("SousTraitant", SousTraitantSchema);
