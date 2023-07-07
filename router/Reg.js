const router=require('express').Router()
const regc=require('../controller/regcontroller')

router.post('/reg',regc.regshow)

router.post('/login',regc.loginshow)

router.post('/listdata',regc.datalist)

router.get('/getid/:_id',regc.dataid)

router.get('/usersList',regc.userList)

router.patch("/dataid/:_id",regc.datalid);

router.put('/delete/:_id',regc.delte);

module.exports=router