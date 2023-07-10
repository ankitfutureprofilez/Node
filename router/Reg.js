const router = require('express').Router()
const regc = require('../controller/regcontroller')
const verifyToken = require('../middleware/Auth')
//const auth=require('../middleware/Auth')

router.post('/reg', regc.regshow)

router.post('/login', regc.loginshow)

router.post('/listdata', regc.datalist)

router.get('/getid/:_id', regc.dataid)

router.get('/usersList', verifyToken, regc.userList)

router.patch("/dataid/:_id", regc.datalid);

router.put('/delete/:_id', regc.delte);
router.get('/useralldata', verifyToken, regc.appgetr)


module.exports = router