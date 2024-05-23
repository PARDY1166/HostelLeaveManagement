const zod = require('zod');
const Student = require("../models/Student");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');
const Parent = require('../models/Parent');
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
            error : "invalid login details",
            details : success.error
        });
    }

    var studentId;
    try{
        const student = await Student.create(loginDetails);
        studentId = student._id;
    }catch(err){
        console.log(err);
        return res.json({error:"invaild inputs",details:err});
    }

    const token = jwt.sign({studentId},process.env.JWT_SECRET);
    return res.json({
        token : "Bearer "+token
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
        console.log(parent);
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

module.exports = {signUp,signIn,studentDashboard,addParent};