const zod = require('zod');
const Warden = require("../models/Warden");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function signUp(req,res){
    const body = req.body;
    const phoneRegex = new RegExp(/[0-9]+/);
    const wardenSchema = zod.object(
        {
            name : zod.string().trim(),
            password : zod.string().min(8).max(20),
            email : zod.string().email(),
            phoneNumber : zod.string().regex(phoneRegex).length(10),
            hostel : zod.string()
        }
    );

    const loginDetails = {
        name : body.name,
        usn : body.usn,
        password : body.password,
        email : body.email,
        phoneNumber : body.phoneNumber,
        hostel : body.hostel
    }

    const success = wardenSchema.safeParse(loginDetails);
    if(!success){
        return res.json({
            error : "invalid login details",
            details : success.error
        });
    }

    var wardenId;
    try{
        const warden = await Warden.create(loginDetails);
        wardenId = warden._id;
    }catch(err){
        console.log(err);
        return res.json({error:"invaild inputs",details:err});
    }

    const token = jwt.sign({wardenId},process.env.JWT_SECRET);
    return res.json({
        token : "Bearer "+token
    });
}

module.exports = {signUp}