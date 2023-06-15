import db from "@/controllers/dbConnection";
import User from "@/models/User";

const handler = async (req, res) => {
    if(req.method==='POST'){
        console.log(req.body)
        const addToWallet = await User.findOneAndUpdate({ username: req.body.username }, { $inc: { topupWallet : req.body.amount, deposits:req.body.amount}});
        if(addToWallet){
            res.status(200).json({success : true, message : "Funds added"})
        }
        else{
            res.status(404).json({success : false, message : "User not found"})
        }
    }
};

export default db(handler);