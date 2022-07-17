const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide your name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please provide your email address'], 
        // match: ['[a-z0-9]+@[a-z]+\.[a-z]{2,3}', 'please provide valid email'],
        // unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 8,
    },

})

// UserSchema.pre('save', async function(){
//     const salt =  await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt)
// })

module.exports = mongoose.model('User',UserSchema)