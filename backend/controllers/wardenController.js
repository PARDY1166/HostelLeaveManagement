const zod = require('zod');
const Warden = require("../models/Warden");
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
    console.log(loginDetails);

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
        console.log(warden);
        wardenId = warden._id;
    }catch(err){
        return res.json({error:"error while adding to database",details:err});
    }

    const token = jwt.sign({wardenId},process.env.JWT_SECRET);
    return res.json({
        token : "Bearer "+token
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
    if(!success){
        return res.json(
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
            return res.json({
                error : "user doesnt exist"
            })
        }
        if(warden.password!=loginDetails.password){
            return res.json(
                {
                    error : "invalid password"
                }
            )
        }
        wardenId = warden._id;
    }catch(err){
        return res.json(
            {
                error : "error while finding user"
            }
        )
    }
    const token = jwt.sign({wardenId},process.env.JWT_SECRET);
    return res.json(
        {
            message : "user logged in",
            token : "bearer "+token
        }
    );
}

async function wardenDashboard(req,res){
    // console.log(req);
    const wardenId = req.wardenId;
    if(!wardenId){
        return res.json({
            error : "verification not done"
        })
    }
    try{
        const warden = await Warden.findOne(
            {
                _id : wardenId
            }
        );
        if(!warden){
            return res.json({
                error : "no student found"
            });
        }
        return res.json({
            wardenName : warden.name
        });
    }catch(err){
        return res.json({
            error : "error while searching database"
        })
    }
    
}

module.exports = {signUp,signIn,wardenDashboard}