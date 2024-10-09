const express = require("express");
const usercontroller = require('../controllers/usercontroller');
const router = express.Router();


router.use(express.urlencoded({ extended: false }));



router.get('/',(req,res)=>{
    res.render('home')
})
router.get('/add/user',(req,res)=>{
    res.render('sign')
})
router.post('/add/user',(req,res)=>{
    usercontroller.addUser(req,res)

})
router.get('/welcomeadmin',(req,res)=>{
    usercontroller.getUser(req,res)
})
router.get('/student/edit/page/:id',(req,res)=>{
    usercontroller.getUserForEdit(req,res)
})
router.post('/update/student/:id',(req,res)=>{
    usercontroller.updateUser(req,res)
})
router.get('/delete/student/:id',(req,res)=>{
    usercontroller.deleteUser(req,res)
})
router.post('/login',(req,res)=>{
    usercontroller.doLogin(req,res)

})

module.exports = router