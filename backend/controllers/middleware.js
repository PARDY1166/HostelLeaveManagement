
const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader.startsWith("bearer")){
        return res.json(
            {
                error : "invalid token"
            }
        )
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.studentId){
            req.studentId = decoded.studentId;
        }else if(decoded.parentId){
            req.parentId = decoded.parentId;
        }else if(decoded.wardenId){
            req.wardenId = decoded.wardenId;
        }
        next();
    }catch(err){
        console.error(err);
        return res.json(
            {
                error : "error while verifying token",
                details : err
            }
        )
    }
}

module.exports = authMiddleware;