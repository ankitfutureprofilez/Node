const mongoose=require("mongoose")

const productschema=mongoose.Schema({
    name:{
        type: String,
        trim: true,
    },
    desc:{
        type: String,
        trim: true,

    },
    price:{
        type: Number,
        trim: true,
    },
    rating:{
        type: Number,
        trim: true,
        minlength:1,
        maxlength: 5 ,
    },
    year:{
        type: Number,
        trim: true,
      
    },
    emi:{
        type: Number,
        trim: true,
    },
    thumbnail:{
       // data: Buffer,
        type: String
  
    },
    userId:{type:Number}
})


module.exports=mongoose.model('products',productschema)

