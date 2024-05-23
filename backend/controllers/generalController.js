require('dotenv').config();

async function getType(req,res){
    const token = req.body.token;
    const response = jwt.verify(token,process.env.JWT_SECRET);
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