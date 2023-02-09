const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id });
  if (!jobs.length) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "There is no job to display" });
  }
  res.status(StatusCodes.OK).json(jobs);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const getJobInfo = async (req, res) => {
  const jobID = req.params.id;
  const job = await Job.findById(jobID);
  if (!job) {
    throw new BadRequestError(`there is no user with this id: ${jobID}`);
  }
  res.status(StatusCodes.OK).json(job);
};

const updateJobInfo = async (req, res) => {
  const jobID = req.params.id;
  const job = await Job.findByIdAndUpdate(jobID, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    throw new BadRequestError(`there is no user with this id: ${jobID}`);
  }
  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const jobID = req.params.id;
  const job = await Job.findByIdAndDelete(jobID);
  if (!job) {
    throw new BadRequestError(`there is no user with this id: ${jobID}`);
  }
  res.status(StatusCodes.OK).json(job);
};

module.exports = {
  getAllJobs,
  getJobInfo,
  createJob,
  updateJobInfo,
  deleteJob,
};
