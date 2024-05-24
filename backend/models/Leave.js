const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema(
    {
        dateOfApplication : {type:Date,required:true},
        dateOfReturn : {type:Date,required:true},
        usn : {type:String,required:true},
        parentId : {type:String,required:true},
        wardenId : {type:String,required:true},
        reason :{type:String,required:true},
        isApproved:{type:Boolean,default:false,required:true},
        isRejected:{type:Boolean,default:false,required:true}
    }
);

const Leave = new mongoose.model("leave",leaveSchema);
module.exports = Leave;