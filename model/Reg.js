const mongoose = require("mongoose")


const regSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 12,
        minlength: 5
    },

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 15,
        minlength: 5
    },
    email: String,
    password: {
        type: String,
        select: false
    },
    confirmpasword: {
        type: String,
        select: false
    },
    status: { type: Number, default: '1' },
    phone: Number,


})



module.exports = mongoose.model('users', regSchema)    
