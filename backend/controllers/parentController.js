const zod = require('zod');
const Parent = require('../models/Parent');
const Student = require('../models/Student');

const jwt = require('jsonwebtoken');
require('dotenv').config();

async function signUp(req,res){
    const body = req.body;
    const phoneRegex = new RegExp(/[0-9]+/);

    const parentSchema = zod.object(
        {
            name : zod.string().trim(),
            password : zod.string().min(8).max(20),
            phoneNumber : zod.string().regex(phoneRegex).length(10),
            studentUsn : zod.string().length(10)
        }
    );
    const signUpDetails = {
        name : body.name,
        password : body.password,
        phoneNumber : body.phoneNumber,
        studentUsn : body.usn
    }

    const success = parentSchema.safeParse(signUpDetails);

    if(!success){
        return res.json(
            {
                error : "invalid inputs",
                details : success.error
            }
        )
    }
    try{
        const student = await Student.findOne(
            {
                usn:signUpDetails.studentUsn
            }
        )
        if(!student){
            return res.json(
                {
                    error : "no such usn found"
                }
            )
        }
    }catch(err){
        return res.json(
            {
                error : "error during search for usn"
            }
        )
    }
    var parentId;
    try{
        const parent = await Parent.create(signUpDetails);
        parentId = parent._id;
    }catch(err){
        return res.json({
            error : "couldn't add to the database",
            details : err
        })
    }

    const token = jwt.sign({parentId},process.env.JWT_SECRET);
    return res.json(
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
        return res.json(
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
            return res.json({
                error : "user doesnt exist"
            })
        }
        if(parent.password!=loginDetails.password){
            return res.json(
                {
                    error : "invalid password"
                }
            )
        }
        parentId = parent._id;
    }catch(err){
        return res.json(
            {
                error : "error while finding user"
            }
        )
    }
    const token = jwt.sign({parentId},process.env.JWT_SECRET);
    return res.json(
        {
            message : "user logged in",
            token : "bearer "+token
        }
    );
}

async function parentDashboard(req,res){
    // console.log(req);
    const parentId = req.parentId;
    if(!parentId){
        return res.json({
            error : "verification not done"
        })
    }
    try{
        const parent = await Parent.findOne(
            {
                _id : parentId
            }
        );
        if(!parent){
            return res.json({
                error : "no student found"
            });
        }
        return res.json({
            parent : parent.name
        });
    }catch(err){
        return res.json({
            error : "error while searching database"
        })
    }
    
}


module.exports = {signUp,signIn,parentDashboard};