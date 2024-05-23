const zod = require('zod');
const Student = require("../models/Student");
const Leave = require("../models/Leave");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');
const Parent = require('../models/Parent');
const Warden = require('../models/Warden');
require("dotenv").config();

async function signUp(req,res){
    const body = req.body;
    const phoneRegex = new RegExp(/[0-9]+/);
    const studentSchema = zod.object(
        {
            name : zod.string().trim(),
            usn : zod.string().length(10),
            password : zod.string().min(8).max(20),
            email : zod.string().email(),
            // phoneNumber : zod.string().refine(validator.isMobilePhone),
            phoneNumber : zod.string().regex(phoneRegex).length(10),
            hostel : zod.string()
        }
    )

    const loginDetails = {
        name : body.name,
        usn : body.usn,
        password : body.password,
        email : body.email,
        phoneNumber : body.phoneNumber,
        hostel : body.hostel
    }

    const success = studentSchema.safeParse(loginDetails);
    if(!success){
        return res.json({
            error : "login detail out of bound",
            details : success.error
        });
    }

    var studentId;
    try{
        const student = await Student.create(loginDetails);
        studentId = student._id;
        const warden = await Warden.findOne(
            {
                hostel : student.hostel
            }
        );
        console.log(warden);
        const updated = await Student.updateOne({_id:student._id},{$set:{wardenId:warden._id}},{new:true});
        console.log(updated)
    }catch(err){
        console.log(err);
        return res.json({error:"Failed to add",details:err});
    }

    const token = jwt.sign({studentId},process.env.JWT_SECRET);
    return res.json({
        token : "bearer "+token
    });
    
}

async function signIn(req,res){
    const body = req.body;
    const loginSchema = zod.object(
        {
            usn : zod.string().length(10),
            password : zod.string().min(8).max(20)
        }
    );

    const loginDetails = {
        usn : body.usn,
        password : body.password
    }
    const success = loginSchema.safeParse(loginDetails);
    if(!success){
        return res.json(
            {
                error : "inputs out of bound"
            }
        )
    }
    var studentId;
    try{
        const student = await Student.findOne({
            usn : loginDetails.usn
        });
        if(!student){
            return res.json({
                error : "user doesnt exist"
            })
        }
        if(student.password!=loginDetails.password){
            return res.json(
                {
                    error : "invalid password"
                }
            )
        }
        studentId = student._id;
    }catch(err){
        return res.json(
            {
                error : "error while finding user"
            }
        )
    }
    const token = jwt.sign({studentId},process.env.JWT_SECRET);
    return res.json(
        {
            message : "user logged in",
            token : "bearer "+token
        }
    );
}

async function studentDashboard(req,res){
    // console.log(req);
    const studentId = req.studentId;
    if(!studentId){
        return res.json({
            error : "verification not done"
        })
    }
    try{
        const student = await Student.findOne(
            {
                _id : studentId
            }
        );
        console.log(student);
        if(!student){
            return res.json({
                error : "no student found"
            });
        }
        return res.json({
            studentName : student.name
        });
    }catch(err){
        return res.json({
            error : "error while searching database"
        })
    }
    
}

async function addParent(req,res){
    const phoneRegex = new RegExp(/[0-9]+/);
    const inputSchema = zod.object(
        {
        phoneNumber : zod.string().regex(phoneRegex).length(10)
        }
    );
    const inputDetails = {
        phoneNumber : req.body.phoneNumber
    }

    const success = inputSchema.safeParse(inputDetails);
    if(!success){
        return res.json(
            {
                error : "input details out of bound"
            }
        )
    }
    var parent;
    try{
        console.log(inputDetails);
        parent = await Parent.findOne(
            {
                phoneNumber : inputDetails.phoneNumber
            }
        );
        if(!parent){
            return res.json(
                {
                    error : "no such parent found"
                }
            );
        }
    }catch(err){
        return res.json(
            {
                error : "error occured while searching the parent",
                details : err
            }
        )
    }

    try{
        const student = await Student.findOne(
            {
                _id : req.studentId
            }
        )
        if(student.parentId){
            return res.json(
                {
                    error : "parent already present"
                }
            )
        }
        const updated = await Student.updateOne(
            {
                _id : req.studentId
            },
            {
                parentId : parent._id
            }
        )
        return res.json(
            {
                message : "parent added succesfully"
            }
        )
    }catch(err){
        return res.json(
            {
                error : "error while searhing for student or updating the user",
                details : err
            }
        )
    }

}
async function leaveApplication(req,res){
    const {dateOfApplication,dateOfReturn,isApproved,reason} = req.body;

    const studentId = req.studentId;
    var currentStudent;

    try{
         currentStudent = await Student.findOne(
            {
                _id : studentId
            }
        )
        if(!currentStudent){
            return res.json({
                error : "student not found"
            });
        }
    }catch(err){
        return res.json({
            error : "error while searching for student"
        });
    }
    console.log(currentStudent)
    const leaveSchema = zod.object({
        dateOfApplication : zod.string().date(),
        dateOfReturn : zod.string().date(),
        usn : zod.string().length(10),
        parentId : zod.string(),
        wardenId : zod.string(),
        isApproved: zod.boolean(),
        reason: zod.string().min(10).max(100),
    });
    const leaveDetails = {
        dateOfApplication,
        dateOfReturn,
        usn : currentStudent.usn,
        parentId : currentStudent.parentId,
        wardenId:currentStudent.wardenId,
        isApproved,
        reason
    }
    console.log(leaveDetails.isApproved)
    const success = leaveSchema.safeParse(leaveDetails);
    if(!success) return res.json({
        error : "leave details out of bound",
        details : success.error
    });
    try {
        const leave = await Leave.create(leaveDetails);
        console.log(leave)
        res.json({message:"Waiting for approval"});
    } catch (error) {
        res.json({error:"Failed to add",details:error})
    }
}
module.exports = {signUp,signIn,studentDashboard,addParent,leaveApplication};