const mongoose = require("mongoose");
const CvSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studies: [
    {
      establishment: { type: String, required: false, default: "" },
      section: { type: String, required: false, default: "" },
      diploma: { type: String, required: false, default: "" },
      year: { type: String, required: false, default: "" },
    },
  ],
  professionnal_career: [
    {
      period: { type: String, required: false, default: "" },
      organization: { type: String, required: false, default: "" },
      job: { type: String, required: false, default: "" },
      task_description: { type: String, required: false, default: "" },
    },
  ],
  certifications: [
    {
      year: { type: String, required: false, default: "" },
      domaine: { type: String, required: false, default: "" },
    },
  ],
  projets: [
    {
      organization: { type: String, required: false, default: "" },
      title: { type: String, required: false, default: "" },
      description: { type: String, required: false, default: "" },
    },
  ],
  skills: [{ type: String, required: false, default: "" }],
});

module.exports = mongoose.model("Cv", CvSchema);
