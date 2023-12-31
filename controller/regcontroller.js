const regm = require('../model/Reg')
var jwt = require('jsonwebtoken');
require('dotenv').config()
//const mongoose = require('mongoose');



exports.regshow = (async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, username, confirmpassword, phone } = req.body
        const lastuserid = await regm.findOne({}, "userId").sort({ userId: -1 });
        const newUserId = lastuserid ? lastuserid.userId + 1 : 1;
        let isAlready = await regm.findOne({ username: username });
        if (isAlready) {
            return res.status(400).json({
                msg: "That user already exisits!",
                status: false
            });
        }
        console.log("last", lastuserid)
        //  const userId = new mongoose.Types.ObjectId();
        //  const registrationTime = new Date();
        // Insert the new user if they do not exist yet
        let user = new regm({
            userId: newUserId,
            name: name,
            email: email,
            password: password,
            username: username,
            phone: phone,
            confirmpasword: confirmpassword
        });
        const results = await user.save();

        // console.log("result", results);
        if (results) {
            return res.status(200).json({
                msg: "Successfully created !!",
                user: results,
                status: true
            });
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
});

exports.loginshow = (async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await regm.findOne({ username: username });
        const isPassword = await regm.findOne({ password: password });

        if (!user || !isPassword) {
            res.json({
                status: false,
                msg: "Invalid login or password"
            });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        //       console.log(token)
        res.json({
            status: true,
            user: user,
            msg: "Login successfully !!",
            token: token
        });


    } catch (error) {
        console.log(error)
        res.status(200).json({
            msg: error,
            status: "falied"
        });
    }
})

exports.datalist = (async (req, res) => {

    try {
        const key = req.body && req.body.key
        const record = await regm.aggregate([
            {
                $match: { status: { $eq: +key } }
            }
        ])

        if (record) {
            res.json({
                msg: "succesfully",
                data: record,
                status: true

            })
        }


    } catch (error) {
        res.json({
            msg: "invalid code of yhe list ",
            status: false
        })
    }

})

exports.dataid = (async (req, res) => {
    try {
        const _id = req.params._id
        const record = await regm.findById(_id)
        res.json({
            msg: "Suucessfully Id ",
            data: record

        })
    } catch (error) {
        res.json({
            error: error,
            msg: "Not get Id"
        })
    }

})

exports.datalid = (async (req, res) => {
    try {
        const id = req.params._id;
        //   console.log(req.body)
        const record = await regm.findByIdAndUpdate(id, req.body);
        res.json({
            msg: "success",
            record: record
        })
    } catch (error) {
        res.json({
            msg: "not valid id",
            error: error
        })
    }

})

exports.delte = (async (req, res) => {
    try {
        const id = req.params._id;

        const record = await regm.findByIdAndUpdate(id, { status: 0 });
        res.json({
            msg: "success",
            record: record
        })
    } catch (error) {
        res.json({
            msg: "not valid id",
            error: error
        })
    }

})

exports.userList = (async (req, res) => {

    try {

        const record = await regm.find({})
        //    console.log(record)

        res.json({
            msg: "Sucessfully senr all  data",
            data: record,
        })
    } catch (error) {
        res.json({
            error: error,
            msg: "Not Usaers Data Send"
        })
    }


})




exports.appgetr = (async (req, res) => {
    try {
        const user = await regm.find({})
        //console.log(user)
        res.json({
            status: 'success',
            message: 'Logged In User Information.',
            data: user
        });
    } catch (error) {
        console.log(error)
    }

})


