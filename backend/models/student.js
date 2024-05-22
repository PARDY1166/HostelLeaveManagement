const mongoose = require('mongoose');


const studentSchema = new mongoose.schema(
    {
        name : {type:String,minLength:3,required:true},
        phoneNumber : {type:Number,minLength:10,maxLength,unique:true},
        email: {type:String,minLength:13,maxLength:50,unique:true},
        usn : {type:String,minLength:10,maxLength:10,unique:true},
        password:{type:String,minLength:8,maxLength:20},
        hostel :{type:String},
        parentId:{type:Number}
    }
);
const Student = mongoose.model("student",studentSchema);

module.exports = Student;