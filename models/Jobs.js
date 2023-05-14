const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    companyLogo: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    remote: {
      type: Boolean,
      required: true,
    },
    typeOfEmployment: {
      type: String,
    },
    level: {
      type: String,
    },
    employeesCount: {
      type: Number,
    },
    applicants: {
      type: Number,
    },
    skills: {
      type: String,
    },
    responsibilities: {
      type: [String],
    },
    requirements: {
      type: [String],
    },
    niceToHave: {
      type: [String],
    },
    weOffer: {
      type: [String],
    },
    aboutJob: {
      type: String,
    },
    aboutCompany: {
      type: String,
    },
    applied: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
