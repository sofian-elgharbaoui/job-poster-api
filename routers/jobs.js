const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");

const {
  getAllJobs,
  getJobInfo,
  createJob,
  updateJobInfo,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);

router
  .route("/:id")
  .get(authMiddleware, getJobInfo)
  .patch(authMiddleware, updateJobInfo)
  .delete(authMiddleware, deleteJob);

module.exports = router;
