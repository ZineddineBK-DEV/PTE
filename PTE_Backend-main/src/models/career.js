const mongoose = require("mongoose");
const CareerSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  /**Status :  [new, inDevelopment : [in review , inTest]  , ready] */
  
  status: { type: String, required: false},
  devLevel: { type: String, required: false },
  

  feedBack: { type: String, required: false },
  files: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = mongoose.model("Career", CareerSchema);
