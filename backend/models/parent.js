const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema(
    {
    name : {type:String,minLength:3,required:true},
    phoneNumber : {type:Number,minLength:10,maxLength:10,unique:true},
    password:{type:String,minLength:8,maxLength:20},
    }
);

const Parent =  new mongoose.model("parent",parentSchema);

module.exports = Parent;