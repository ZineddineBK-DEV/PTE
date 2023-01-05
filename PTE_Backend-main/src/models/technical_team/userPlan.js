const mongoose = require("mongoose");
const UserPlanSchema = mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pdf:{type:String, default:""},
  
});
module.exports = mongoose.model("UserPlan", UserPlanSchema);
