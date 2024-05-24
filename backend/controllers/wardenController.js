const zod = require('zod');
const Warden = require("../models/Warden");
const Leave = require("../models/Leave");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const db = require('../index');

async function signUp(req,res){
    // console.log(await Warden.collection.indexes());
    // await Warden.collection.dropIndex({"number":1});
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
        password : body.password,
        email : body.email,
        phoneNumber : body.phoneNumber,
        hostel : body.hostel
    }

    const success = wardenSchema.safeParse(loginDetails);
    if(!success.success){
        return res.status(400).json({
            error : "input details out of bound",
            details : success.error
        });
    }

    var wardenId;
    try{
        const warden = await Warden.create(loginDetails);
        console.log(warden);
        wardenId = warden._id;
    }catch(err){
        return res.status(500).json({error:"error while adding to database",details:err});
    }

    const token = jwt.sign({wardenId},process.env.JWT_SECRET);
    return res.status(200).json({
        token : "bearer "+token
    });
}

async function signIn(req,res){
    const body = req.body;
    const loginSchema = zod.object(
        {
            email : zod.string().email(),
            password : zod.string().min(8).max(20)
        }
    );

    const loginDetails = {
        email : body.email,
        password : body.password
    }
    const success = loginSchema.safeParse(loginDetails);
    if(!success.success){
        return res.status(400).json(
            {
                error : "inputs out of bound"
            }
        )
    }
    var wardenId;
    try{
        const warden = await Warden.findOne({
            email : loginDetails.email
        });
        if(!warden){
            return res.status(404).json({
                error : "user doesn't exist"
            })
        }
        if(warden.password!=loginDetails.password){
            return res.status(401).json(
                {
                    error : "invalid password"
                }
            )
        }
        wardenId = warden._id;
    }catch(err){
        return res.status(500).json(
            {
                error : "error while finding user"
            }
        )
    }
    const token = jwt.sign({wardenId},process.env.JWT_SECRET);
    return res.status(200).json(
        {
            message : "user logged in",
            token : "bearer "+token
        }
    );
}

async function wardenDashboard(req,res){
    const wardenId = req.wardenId;

    
    if(!wardenId){
        return res.status(400).json({
            error : "verification not done"
        })
    }
    try{
        console.log("gi");
        const warden = await Warden.findOne(
            {
                _id:wardenId
            }
        );
        console.log(warden);
        const leaveDetails = await Leave.find(
            {
                wardenId,
                isApproved : true,
                isRejected : false
            }
        );
        console.log(leaveDetails);
        if(!leaveDetails){
            return res.json({
                warden,
                error : "nothing to approve"
            });
        }
        return res.status(200).json({leaveDetails,warden});
    }catch(err){
        return res.status(500).json({
            error : "error while searching database"
        })
    }
    
}

module.exports = {signUp,signIn,wardenDashboard}