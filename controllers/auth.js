const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken');



const register  = async (req, res) => { 
    const {name,email,password} = req.body

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const tempUser = {name,email,password:hashedPassword }
    
    
    const user = await User.create({...tempUser})
    const token = jwt.sign({ userId: user._id, name: user.getName()}, 'jwtScret', {
        expiresIn: '30d'
    })
    res.status(StatusCodes.CREATED).json({user: {name: user.getName()},token})
}

const login  = async (req, res) => {
    res.send('login user')
}


module.exports = { 
    register,
    login
}