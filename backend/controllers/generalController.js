require('dotenv').config();
const jwt = require('jsonwebtoken');

async function getType(req,res){
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    const updated = token.split(" ")[1];
    const response = jwt.verify(updated,process.env.JWT_SECRET);
    if(response.studentId){
        return res.json(
            {
                type : "student"
            }
        )
    }
    if(response.parentId){
        return res.json(
            {
                type : "parent"
            }
        )
    }
    if(response.wardenId){
        return res.json(
            {
                type : "warden"
            }
        )
    }
}

module.exports = {getType};