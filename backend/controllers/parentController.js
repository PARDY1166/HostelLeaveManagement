const zod = require('zod');
const Parent = require('../models/Parent');
const Student = require('../models/Student');

const jwt = require('jsonwebtoken');
const Leave = require('../models/Leave');
require('dotenv').config();

async function signUp(req,res){
    const body = req.body;
    const phoneRegex = new RegExp(/[0-9]+/);

    const parentSchema = zod.object(
        {
            name : zod.string().trim(),
            password : zod.string().min(8).max(20),
            phoneNumber : zod.string().regex(phoneRegex).length(10),
        }
    );
    const signUpDetails = {
        name : body.name,
        password : body.password,
        phoneNumber : body.phoneNumber,
    }

    const success = parentSchema.safeParse(signUpDetails);

    if(!success.success){
        return res.status(400).json(
            {
                error : "inputs out of bound",
                details : success.error
            }
        )
    }
    
    var parentId;
    try{
        const parent = await Parent.create(signUpDetails);
        parentId = parent._id;
    }catch(err){
        return res.status(500).json({
            error : "couldn't add to the database",
            details : err
        })
    }

    const token = jwt.sign({parentId},process.env.JWT_SECRET);
    return res.status(200).json(
        {
            token : "Bearer "+token
        }
    )
}


async function signIn(req,res){
    const body = req.body;
    const loginSchema = zod.object(
        {
            phoneNumber : zod.string().min(10),
            password : zod.string().min(8).max(20)
        }
    );

    const loginDetails = {
        phoneNumber : body.phoneNumber,
        password : body.password
    }
    const success = loginSchema.safeParse(loginDetails);
    if(!success){
        return res.status(400).json(
            {
                error : "inputs out of bound"
            }
        )
    }
    var parentId;
    try{
        const parent = await Parent.findOne({
            phoneNumber : loginDetails.phoneNumber
        });
        if(!parent){
            return res.status(404).json({
                error : "user doesnt exist"
            })
        }
        if(parent.password!=loginDetails.password){
            return res.status(401).json(
                {
                    error : "invalid password"
                }
            )
        }
        parentId = parent._id;
    }catch(err){
        return res.status(500).json(
            {
                error : "error while finding user"
            }
        )
    }
    const token = jwt.sign({parentId},process.env.JWT_SECRET);
    return res.status(200).json(
        {
            message : "user logged in",
            token : "bearer "+token
        }
    );
}

async function parentDashboard(req,res){
    const parentId = req.parentId;
    if(!parentId){
        return res.json({
            error : "verification not done"
        })
    }
    try{
        const leaveDetails = await Leave.findOne(
            {
                parentId
            }
        );
        if(!leaveDetails){
            return res.json({
                error : "nothing to approve"
            });
        }
        return res.json(leaveDetails);
    }catch(err){
        return res.json({
            error : "error while searching database"
        })
    }
    
}


module.exports = {signUp,signIn,parentDashboard};