const router=require('express').Router()
const regc=require('../controller/regcontroller')

router.post('/reg',regc.regshow)

router.post('/login',regc.loginshow)

router.get('/listdata',regc.datalist)

router.get('/getid/:_id',regc.dataid)
router.patch("/dataid/:_id",regc.datalid);

router.delete('/delete/:_id',regc.delte);

module.exports=router