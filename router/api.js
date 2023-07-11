const router = require('express').Router()
const regc = require('../controller/regcontroller')
const productc=require('../controller/Product')
const verifyToken = require('../middleware/Auth')
const multer=require('multer')

let storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})

router.post('/reg', regc.regshow)

router.post('/login', regc.loginshow)

router.post('/listdata', regc.datalist)

router.get('/getid/:_id', regc.dataid)

router.get('/usersList', verifyToken, regc.userList)

router.patch("/dataid/:_id", regc.datalid);

router.put('/delete/:_id', regc.delte);

router.get('/useralldata', verifyToken, regc.appgetr)

router.post('/product',upload.single('file'),productc.productadd)

router.get('/product',productc.productshow)


router.patch('/Product/:id',productc.Productupdate)

router.delete('/product/:id',productc.productdelete)

router.get('/Products/:id',productc.productsingleid)

module.exports = router