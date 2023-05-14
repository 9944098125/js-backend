const Jobs = require("../models/Jobs");

const createJob = async (req, res, next) => {
  const { companyLogo, companyName, jobTitle, location, remote } = req.body;
  try {
    const savedJob = await new Jobs({
      companyLogo,
      companyName,
      jobTitle,
      location,
      remote,
    }).save();

    res.status(201).json({
      message: "Job created successfully",
      job: savedJob,
    });
  } catch (err) {
    next(err);
  }
};

const createJobDetails = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const fullJobDetails = await Jobs.findByIdAndUpdate(
      jobId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      message: "Created job details successfully",
      jobDetails: fullJobDetails,
    });
  } catch (err) {
    next(err);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Jobs.find();
    res.status(200).json({
      message: "Found the jobs successfully",
      jobs: jobs,
    });
  } catch (err) {
    next(err);
  }
};

const getJobDetailsByJobId = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const jobWithDetails = await Jobs.findOne({ _id: jobId });
    res.status(200).json({
      message: "Found the job with all the details",
      job: jobWithDetails,
    });
  } catch (err) {
    next(err);
  }
};

const deleteJobById = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    await Jobs.findByIdAndDelete({ _id: jobId });
    res.status(200).json({ message: "Deleted the job successfully..." });
  } catch (err) {
    next(err);
  }
};

const applyForJob = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    await Jobs.findByIdAndUpdate(jobId, { applied: true }, { new: true });
    res
      .status(200)
      .json({ message: "Applied to the Job Successfully", applied: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createJob,
  createJobDetails,
  getJobs,
  getJobDetailsByJobId,
  deleteJobById,
  applyForJob,
};
