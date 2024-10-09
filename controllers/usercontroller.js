const Student = require('../models/Student');
const bcrypt = require('bcrypt')
const saltRound = 10;


async function addUser(req,res){
    try {
        console.log(req.body);
        let student = new Student(req.body);
        await student.save();
        res.render('home')
    } catch (err) {
        console.log(err)
    }
}      
async function getUser(req,res){
    try {
        let students = await Student.find({});
        console.log(students);
        res.render('welcomeadmin',{
            students: students
        });
        
    } catch (err) {
        
    }
}
async function getUserForEdit(req,res) {
    try {
        let id = req.params.id;
        let student = await Student.findOne({ _id: id });
        console.log(student);
        res.render('useredit',{
            student:student
        })
        
        
    } catch (err) {
        console.log(err,'err');
        
    }
    
}
async function updateUser(req,res) {
    try {
        let id = req.params.id;
        console.log(req.body,'req.body')
        let student = await Student.findOne({ _id: id});
        console.log(student);
        student.emailId = req.body.emailId;
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.mobileNo = req.body.mobileNo;
        student.createdAt = req.body.createdAt;
        await student.save();
        let students = await Student.find({});
        res.render("welcomeadmin",{
            students: students
        })
        
    } catch (err) {
        console.log(err,'err')
    }
}async function deleteUser(req,res) {
    try {
        let id = req.params.id;
        await Student.deleteOne({ _id: id});
        let students = await Student.find({});
        res.render('welcomeadmin',{
            students:students
        })
        
    } catch (err) {
        console.log(err,'err')
        
    }
    
}
async function doLogin(req,res) {
    try {
        console.log(req.body);
        
        let user = await Student.findOne({emailId: req.body.emailId});
        if(!user){
            res.end('No user found')
        }else{
            const isMatch = await bcrypt.compare(req.body.password,user.password);
            if(isMatch) {
                if(user.usertype === 1){
                    res.render('welcomeadmin')
                }else{
                    res.render('welcomeuser')
                }
                res.render('welcomeuser')
            }else{
                res.end("wrong password")
            }
        }
        
    } catch (err) {
        console.log(err)
        
    }
    
}
module.exports = {
    addUser,getUser,getUserForEdit,updateUser,deleteUser,doLogin
}