const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobInfo,
  createJob,
  updateJobInfo,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);

router.route("/:id").get(getJobInfo).patch(updateJobInfo).delete(deleteJob);

module.exports = router;
