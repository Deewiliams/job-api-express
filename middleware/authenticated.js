const User = require('../models/User')
const jwt = require('jsonwebtoken');
const {UnthenticatedError} = require('../errors')

// const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req,res,next) => { 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnthenticatedError('No token provided');
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attaching the user to the job routes
        const user = User.findById(payload.id).select('-password')
        req.user = user
        req.user = {userId:payload.userId, name:payload.name}

        next()
    } catch (error) {
        throw new UnthenticatedError('Not authorized to access this route');
    }
}

module.exports = authenticationMiddleware