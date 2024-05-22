const zod = require('zod');
// const validator = require('validator');
const Student = require("../models/Student");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
            phoneNumber : zod.string().regex(phoneRegex).length(10)
        }
    )
    console.log(body);

    const loginDetails = {
        name : body.name,
        usn : body.usn,
        password : body.password,
        email : body.email,
        phoneNumber : body.phoneNumber
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

module.exports = {signUp};