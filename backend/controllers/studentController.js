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
    if(!success.success){
        return res.status(400).json({
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
        return res.status(500).json({error:"Failed to add",details:err});
    }

    const token = jwt.sign({studentId},process.env.JWT_SECRET);
    return res.status(200).json({
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
        return res.status(400).json(
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
            return res.status(404).json({
                error : "user doesnt exist"
            })
        }
        if(student.password!=loginDetails.password){
            return res.status(401).json(
                {
                    error : "invalid password"
                }
            )
        }
        studentId = student._id;
    }catch(err){
        return res.status(500).json(
            {
                error : "error while finding user"
            }
        )
    }
    const token = jwt.sign({studentId},process.env.JWT_SECRET);
    return res.status(200).json(
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
        if(!student){
            return res.status(404).json({
                error : "no student found"
            });
        }
        return res.json({ student });
    }catch(err){
        return res.status(500).json({
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
    if(!success.success){
        return res.status(400).json(
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
            return res.status(404).json(
                {
                    error : "no such parent found"
                }
            );
        }
    }catch(err){
        return res.status(500).json(
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
            return res.status(401).json(
                {
                    error : "parent already present"
                }
            )
        }
        const newStudent = await Student.findOne(
            {
                parentId : parent._id
            }
        );
        if(newStudent){
            return res.status(400).json(
                {
                    error : "This parent has been assigned to another student"
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
        return res.status(200).json(
            {
                student,
                updated,
                message : "parent added succesfully"
            }
        )
    }catch(err){
        return res.ststus(500).json(
            {
                error : "error while searhing for student or updating the user",
                details : err
            }
        )
    }

}
async function leaveApplication(req,res){

    const {dateOfApplication,dateOfReturn,reason} = req.body;

    const formattedDateOfApplication = new Date(dateOfApplication);
    const formattedDateOfReturn = new Date(dateOfReturn);

    if(formattedDateOfApplication<new Date()){
        return res.status(400).json(
            {
                error : "application date can not be of the past"
            }
        )
    }
    
    const studentId = req.studentId;
    var currentStudent;

    try{
        currentStudent = await Student.findOne(
            {
                _id : studentId
            }
        )
        if(!currentStudent){
            return res.status(404).json({
                error : "student not found"
            });
        }
        if(!currentStudent.parentId){
            return res.status(401).json(
                {
                    error : "parent not added"
                }
            )
        }
        const data = await Leave.findOne(
            {
                usn : currentStudent.usn
            }
        );
        if(data){
            if(data.dateOfReturn<=new Date()){
                Leave.updateOne(data,
                    {
                        completed : true
                    }
                );
            }
    
            const newData = await Leave.findOne(
                {
                    completed:false,
                    usn : currentStudent.usn
                }
            )
            console.log(newData);
            if(newData){
                return res.status(400).json(
                    {
                        error : "cant't apply for more than one leave"
                    }
                )
            }
        }
    }catch(err){
        return res.status(500).json(
            {
                error : "error while searching new db"
            }
        )
    }
    if(formattedDateOfReturn<formattedDateOfApplication){
        return res.status(400).json(
            {
                error : "return date can't be before application date"
            }
        );
    }


    const leaveSchema = zod.object({
        dateOfApplication : zod.string().date(),
        dateOfReturn : zod.string().date(),
        usn : zod.string().length(10),
        parentId : zod.string(),
        wardenId : zod.string(),
        reason: zod.string().min(10).max(100),
    });
    const leaveDetails = {
        dateOfApplication,
        dateOfReturn,
        usn : currentStudent.usn,
        parentId : currentStudent.parentId,
        wardenId:currentStudent.wardenId,
        reason
    }
    const success = leaveSchema.safeParse(leaveDetails);
    if(!success.success) return res.status(400).json({
        error : "leave details out of bound",
        details : success.error
    });
    try {
        const leave = await Leave.create(leaveDetails);
        console.log(typeof(leave.dateOfApplication));
        res.status(200).json({message:"request sent successfully"});
    } catch (error) {
        res.status(500).json({error:"Failed to add",details:error})
    }
}

async function checkStatus(req,res){
    const studentId = req.studentId;
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const tenDaysLater = new Date(currentDate);
    tenDaysLater.setDate(currentDate.getDate()+10);

    console.log(currentDate);
    console.log(tenDaysLater);

    

    try{
        const student = await Student.findOne({
            _id:studentId
        });
        console.log(student);
        const leave = await Leave.findOne(
            {
                usn:student.usn,
                dateOfApplication : {
                    $gte : currentDate,
                    $lt : tenDaysLater
                }
            }
        );
        if(!leave){
            return res.json(
                {
                    error : "couldnt find any such leave"
                }
            )
        }
        console.log(leave);
        return res.status(200).json({leave,student});
    }catch(err){
        return res.status(500).json(
            {
                error : "error while searching for leave"
            }
        )
    }
}

async function history(req,res){
    const studentId = req.studentId;

    try{
        const student = await Student.findOne(
            {
                _id : studentId
            }
        );
        console.log(student);
        if(!student){
            return res.status(404).json(
                {
                    error : "no student found"
                }
            );
        }
        const leave = await Leave.find(
            {
                usn : student.usn
            }
        );
        console.log(leave);
        if(!leave){
            return res.status(404).json(
                {
                    message : "no leaves taken yet"
                }
            )
        }

        return res.status(200).json(
            {
                leave,
                student
            }
        )
    }catch(err){
        return res.status(500).json(
            {
                error : "error while searching db"
            }
        )
    }
}
async function profile(req,res){
    const studentId = req.studentId;

    try{
        const student = await Student.findOne(
            {
                _id : studentId
            }
        );
        if(!student){
            return res.status(404).json(
                {
                    error : "no student found"
                }
            );
        }
        const parentId = student?.parentId
        parent = await Parent.findOne(
            {
                _id : parentId
            }
        );
        if(!parent){
            return res.status(404).json(
                {
                    error : "No Paremt Found"
                }
            );
        }
        return res.status(200).json(
            {
                parent,
                student
            }
        )
    }catch(err){
        return res.status(500).json(
            {
                error : "error while searching db"
            }
        )
    }
}

async function profileUpdate(req, res) {
    const studentId = req.studentId;
    const { email, contact } = req.body;
  
    if (!studentId) {
      return res.status(400).json({
        error: "Verification not done"
      });
    }
  
    try {
      const student = await Student.findOne({ _id: studentId });
      if (!student) {
        return res.status(404).json({
          error: "Student not found"
        });
      }
      if (email) student.email = email;
      if (contact) student.phoneNumber = contact;
  
      await student.save();
  
      return res.status(200).json({
        message: "Profile updated successfully",
        student
      });
    } catch (err) {
      console.error("Error while updating profile: ", err);
      return res.status(500).json({
        error: "Error while updating profile"
      });
    }
  }
  
module.exports = {signUp,signIn,studentDashboard,addParent,leaveApplication,checkStatus,history,profile,profileUpdate};