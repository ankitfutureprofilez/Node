const express=require("express");
const cors=require("cors");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const app=express()
const port=process.env.DB_PATH



app.use(express.json())
app.use(cors())






  
const apiroter=require("./router/api")
const mongoose=require("mongoose")
mongoose.connect(`${process.env.DB_URL}`)
app.use('/regapi',apiroter)

app.listen(port, ()=>{console.log(`server is run  ${port}`)})

