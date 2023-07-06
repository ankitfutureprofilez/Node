const express=require("express");
const cors=require("cors");
const app=express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

const apiroter=require("./router/Reg")
const mongoose=require("mongoose")
mongoose.connect(`${process.env.DB_URL}`)

app.use('/regapi',apiroter)

app.listen(process.env.DB_PATH, ()=>{console.log(`server is run  ${process.env.DB_PATH}`)})

