const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json(jobs);
};
const getJobInfo = async (req, res) => {};
const createJob = async (req, res) => {};
const updateJobInfo = async (req, res) => {};
const deleteJob = async (req, res) => {};

module.exports = {
  getAllJobs,
  getJobInfo,
  createJob,
  updateJobInfo,
  deleteJob,
};
