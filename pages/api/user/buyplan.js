import db from "@/controllers/dbConnection";
import User from "@/models/User";

const handler = async (req, res) => {
    if (req.method === "POST") {
        console.log(req.body);
        const user = await User.findOne({ username: req.body.plan.username });
        if (!user) { return res.status(404).json({ message: "User not found" }) }
        const plan = req.body.plan;

        // check if user has enough balance
        if (user.topupWallet < plan.price) {
            return res.status(400).json({ message: "Insufficient balance" })
        }

        // add plan to user
        user.plans.push(plan);

        // update user balance
        user.topupWallet = user.topupWallet - plan.price;
        // save user
        await user.save();

        // add referral bonus to refferer
        const referrer = await User.findOne({ myreferrals: user.username});
        if (referrer) {
            const refferalBonus = parseInt(plan.referralBonus.split("%")[0]) / 100 * parseInt(plan.price);
            console.log(typeof refferalBonus);
            referrer.directBonus = referrer.directBonus + refferalBonus;
            await referrer.save();
        }


        return res.status(200).json({ message: "Plan purchased successfully" })
    }
};

export default db(handler);