import db from "@/controllers/dbConnection";
import User from "@/models/User";

const handler = async (req, res) => {
    if(req.method ==='POST'){
        const user = await User.findOne({username : req.body.username});
        if(user){
            res.status(200).json({success : true, message : "User found", user : user})
        }
        else{
            res.status(404).json({success : false, message : "User not found"})
        }
    }
};


export default db(handler);