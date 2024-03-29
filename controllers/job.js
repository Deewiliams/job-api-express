const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, notFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findOne({ _id: jobId, createdBy: userId })
    if (!job) {
        throw new notFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJobs = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJobs = async (req, res) => {
    const {
        body: { comapany, position },
        user: { userId },
        params: { id: jobId }
    } = req

    if (!comapany === '' || !position === '') {
        throw new BadRequestError('Please provide the company name and position')
    }

    const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })

    if (!job) {
        throw new notFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJobs = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req
    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId })
    if (!job) {
        throw new notFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}


module.exports = {
    getAllJobs,
    getJob,
    createJobs,
    updateJobs,
    deleteJobs
}