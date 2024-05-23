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
        console.log(student);
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

module.exports = {signUp};