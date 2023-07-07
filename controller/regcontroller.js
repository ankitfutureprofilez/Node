const regm = require('../model/Reg')




exports.regshow = (async (req, res) => {
    //  console.log(req.body)
    try {
        const { name, email, password, username, confirmpasword, phone } = req.body
        let record = await regm.findOne({ username: username });
        let jwtSecretKey = process.env.JWT_SECRET_KEY
        let data = {
            time: Date(),
            userId: 12,
        }
        const token = jwt.sign(data, jwtSecretKey);
        console.log(token)
        if (record) {
            return res.status(400).json({
                msg: "That user already exisits!",
                status: false
            });
        }
        // Insert the new user if they do not exist yet
        let user = new regm({
            name: name,
            email: email,
            password: password,
            username: username,
            phone: phone,
            confirmpasword: confirmpasword
        });
        const results = await user.save();
        // console.log("result", results);
        if (results) {
            return res.status(200).json({
                msg: "Successfully created !!",
                user: results,
                token: token,
                status: true
            });
        }
    } catch (error) {
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
        res.json({
            status: true,
            user: user,
            msg: "Login successfully !!"
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
        //console.log(record)

        // console.log(record)
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
    // console.log(req.params._id)
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
        console.log(req.body)
        const record = await regm.findByIdAndUpdate(id, req.body);
        console.log("record", record);
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
        //  console.log("record", record);
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
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        const record = await regm.find({})
        if (verified) {
            return res.json("Successfully Verified");
        }
        res.json({
            msg: "Sucessfully senr all  data",
            data: record,
            token: token
        })
    } catch (error) {
        res.json({
            error: error,
            msg: "Not Usaers Data Send"
        })
    }


    // console.log(record)
})



