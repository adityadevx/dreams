import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, trim: true },
    telephone: { type: String, trim: true },
    username: { type: String, trim: true },
    country: { type: String, trim: true },
    wallet: { type: Number, trim: true },
    topupWallet: { type: Number, trim: true },
    deposits: { type: Number, trim: true },
    withdrawals: { type: Number, trim: true },
    password: { type: String, trim: true },
    referralId: { type: String, trim: true },
    username: { type: String, trim: true },
    plans: { type: Object },
    gender: { type: String, trim: true },
    dob: { type: String, trim: true },
    doj: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    is_admin: { type: Boolean, default: false },
    sessionId : { type: String, trim: true ,default: ""},
});

export default mongoose.models.User || mongoose.model("User", UserSchema);