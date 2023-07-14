const mongoose = require("mongoose")


const regSchema = mongoose.Schema({
    //userId: {
     //   type: mongoose.Schema.Types.ObjectId,
    //    default: mongoose.Types.ObjectId // Generate a new ObjectId by default
     // },
     // registrationTime: {
      //  type: Date,
     //   default: Date.now // Set the default value as the current date and time
    //  },

    userId:{
        type :Number
    },
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 12,
        minlength: 4
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
