const mongoose = require('mongoose');

const parentSchema = new mongoose.schema(
    {
    name : {type:String,minLength:3,required:true},
    phoneNumber : {type:Number,minLength:10,maxLength,unique:true},
    studentId :{type:Number},
    password:{type:String,minLength:8,maxLength:20},
    }
);

const Parent = new mongoose.model("parent",parentSchema);

module.exports = Parent;