const express=require("express");
const cors=require("cors");
const jwt = require('jsonwebtoken');
//const expressValidator = require('express-validator')
require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())
//app.use(expressValidator())
const apiroter=require("./router/api")
const mongoose=require("mongoose")
mongoose.connect(`${process.env.DB_URL}`)
//app.use(jwt())
app.use('/regapi',apiroter)

app.listen(process.env.DB_PATH, ()=>{console.log(`server is run  ${process.env.DB_PATH}`)})

