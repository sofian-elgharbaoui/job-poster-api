const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide your company name"],
    },

    position: {
      type: String,
      required: [true, "Please pass the position you are lookin for."],
    },

    state: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },

    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
