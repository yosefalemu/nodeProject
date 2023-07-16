const JobSchema = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
//GET ALL JOBS
const getAllJobs = async (req, res) => {
  const jobs = await JobSchema.find({ createdBy: req.user._id }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
//GET SINGLE JOB
const getJob = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: JobId },
  } = req;
  const job = await JobSchema.findOne({ _id: JobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`There is no Job with id ${JobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
//CREATE JOB
const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;
  const job = await JobSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
//UPDATE JOB
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    params: { id: JobId },
    user: { _id: userId },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("please provide company and position name");
  }
  const job = await JobSchema.findOneAndUpdate(
    { createdBy: userId, _id: JobId },
    { company: company, position: position },
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`There is no Job with id ${JobId} to be UPDATED`);
  }
  res.status(StatusCodes.OK).json({ job });
};
//DELETE JOB
const deleteJob = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: jobId },
  } = req;

  const job = await JobSchema.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send("DELETED");
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
