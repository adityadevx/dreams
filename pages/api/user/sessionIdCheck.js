import db from "@/controllers/dbConnection";
import User from "@/models/User";

const handler = async (req, res) => {
    console.log(req.body);

    if (req.method === 'POST') {
        const findSessionId = await User.findOne({ username : req.body.username });
        if (findSessionId) {
            res.status(200).json({ success: true, message: "Session Id found", user: findSessionId })
        }
        else {
            res.status(404).json({ success: false, message: "Session Id not found" })
        }
    }
}

export default db(handler);