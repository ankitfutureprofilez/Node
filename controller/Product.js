const e = require('express')
const productm = require('../model/Product')
const regm = require('../model/Reg')


exports.productadd = (async (req, res) => {
    // console.log("File: ", req.file);
    // const dataw=data.userId

    try {

        const userId = req.user.userId

        const { name, desc, price, year, emi, thumbnail, rating } = req.body
        //console.log(req.file)
        const record = new productm({
            name: name,
            desc: desc,
            price: price,
            year: year,
            emi: emi,
            thumbnail: thumbnail,
            rating: rating,
            userId: userId
        });
        const result = await record.save()
        //   console.log(result)
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

        const userId = req.user.userId
        //  const userId = req.query.userId
        //const userId = req.params.userId;

        //  console.log(userId)
        const record = await productm.find(
            { 
                price: { $gt: 5000 }, 
                rating: { $gt: 2 }, 
                year: { $gte: 2000 }, 
                userId: userId });
   ///     console.log(record)

        res.json({
            data: record,
            msg: "Succes",
            status: 200
        })


    } catch (error) {
        console.log(error)
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
        const id = req.params.id;
        const { name, desc, price, rating, emi, year, thumbnail } = req.body;
        const record = await productm.findByIdAndUpdate(id, {
            name: name,
            desc: desc,
            thumbnail: thumbnail,
            price: price,
            rating: rating,
            emi: emi,
            year: year
        });
        res.json({
            data: record,
            msg: "Successfully updated",
            status: 200
        });
    } catch (error) {
        res.status(400).json({
            error: error,
            msg: "Failed to update",
            status: 400
        });
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

exports.productsingleid = (async (req, res) => {
    console.log(req.params.id)
    try {
        const id = req.params.id
        const record = await productm.findById(id)
      //  console.log(record)
        res.json({
            data: record,
            msg: "succesfully fect id",
            status: 200
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: "cannot get id",
            status: 200, error: error
        })
    }

})


exports.usershow=(async(req,res)=>{
try{

    const record= await productm.find({})
    //console.log(record)
    res.json({
        data:record,
        msg:"succesfuly",
        status:200
    })
}catch(err){
    console.log(err)
}



})
