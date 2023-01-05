const mongoose = require("mongoose");
const SousTraitantEventSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    email: {type: String,required: true},
    cv: { type: String, required: true },
});
module.exports = mongoose.model("SousTraitantEvent", SousTraitantEventSchema);
