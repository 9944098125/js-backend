const router = require("express").Router();
const {
  createJob,
  createJobDetails,
  getJobs,
  getJobDetailsByJobId,
  deleteJobById,
  applyForJob,
} = require("../controllers/jobs");

router.route("/createJob").post(createJob);

router.route("/createJobDetails/:jobId").post(createJobDetails);

router.route("/getJobs").get(getJobs);

router.route("/getJobs/:jobId").get(getJobDetailsByJobId);

router.route("/deleteJob/:jobId").delete(deleteJobById);

router.route("/apply/:jobId").patch(applyForJob);

module.exports = router;
