const e = require('express')
const productm = require('../model/Product')


exports.productadd = (async (req, res) => {
    //console.log(req.body)
    // console.log("File: ", req.file);
    try {

        const { name, desc, price, year, emi, thumbnail, rating } = req.body
        //console.log(req.file)
        const record = new productm({
            name: name,
            desc: desc,
            price: price,
            year: year,
            emi: emi,
            thumbnail: thumbnail,
            rating: rating
        });
        const result = await record.save()
        console.log(result)
        if (result) {
            res.json({
                result: result,
                msg: "Suucessfully ",
                status: 200
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            error: error,
            msg: "Failed",
            status: 400
        })
    }

})




exports.productshow = (async (req, res) => {

    try {
        const record = await productm.find({})
        res.json({
            data: record,
            msg: "Suucessfully ",
            status: 200
        })
    } catch (error) {
        res.json({
            error: error,
            msg: "Failed",
            status: 400
        })
    }

})


exports.Productupdate = (async (req, res) => {
    //  console.log(req.params.id)
    //console.log(req.body)
    try {
        const id = req.params.id
        const { name, desc, price, rating, emi, year, thumbnail } = req.body
        const record = await productm.findByIdAndUpdate(id, {
            name: name,
            desc: desc, 
            thumbnail: thumbnail,
            price: price, 
            rating: rating, 
            emi: emi,
            year: year
        })
        res.json({
            data: record,
            msg: "Suucessfully Update",
            status: 200
        })
    } catch (error) {
        res.json({
            error: error,
            msg: "failed",
            status: 400
        })
    }
})


exports.productdelete = (async (req, res) => {
    try {
        const id = req.params.id
        //  console.log(id)
        const record = await productm.findByIdAndDelete(id)
        res.json({
            data: record,
            msg: "Suucessfully Delte",
            status: 200


        })
    } catch (error) {
        res.json({
            error: error,
            msg: "Failed",
            status: 400
        })
    }

})

exports.productsingleid=(async(req,res)=>{
  console.log(req.params.id)
   try{
    const id=req.params.id
    const record=  await productm.findById(id)
    console.log(record)
    res.json({
       data:record,
       msg:"succesfully fect id",
       status:200
    })
   }catch(  error ){
    console.log(error)
    res.json({
        msg:"cannot get id",
        status:200,error:error
     })
   }

})
