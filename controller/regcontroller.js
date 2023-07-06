const regm = require('../model/Reg')




exports.regshow = (async (req, res) => {
    //  console.log(req.body)
    try {
        const { name, email, password, username, confirmpasword, phone } = req.body
        let record = await regm.findOne({ username: username });
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
        console.log("result", results);
        if (results) {
            return res.status(200).json({
                msg: "Successfully created !!",
                user: results,
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
        const record = await regm.find()
        // console.log(record)
        res.json({
            msg: "succesfully",
            data: record,
            status: true

        })

    } catch (error) {
        res.json({
            msg: "invalid code of yhe list ",
            status: false
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
        console.log(req.params._id)
        const id = req.params._id
        const record = await regm.findByIdAndDelete(id)
        res.json({
            record: record,
            msg: "Successfully Delte"
        })
    } catch (error) {
        res.json({
            error: error,
            msg: "not delte"
        })

    }
})


exports.dataid = (async (req, res) => {
    //  console.log(req.params._id)
    try {
        const id = req.params._id
        const record = await regm.findById(id)
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

