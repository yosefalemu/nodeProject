const mongoose = require("mongoose");
const JobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserSchema",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("JobSchema", JobSchema);
