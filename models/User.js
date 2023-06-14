import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, trim: true },
    telephone: { type: String, trim: true, },
    username: { type: String, trim: true },
    country: { type: String, trim: true },
    wallet: { type: Number, trim: true },
    topupWallet: { type: Number, trim: true },
    deposits: { type: Number, trim: true },
    withdrawals: { type: Number, trim: true },
    password: { type: String, trim: true },
    referralId: { type: String, trim: true },
    username: { type: String, trim: true },
    plans: { type: Array },
    referredBy: { type: String, trim: true },
    gender: { type: String, trim: true, default: "" },
    dob: { type: String, trim: true, default: "" },
    doj: { default: Date.now, type: Date },
    city: { type: String, trim: true, default: "" },
    state: { type: String, trim: true, default: "" },
    is_admin: { type: Boolean, default: false },
    sessionId: { type: String, trim: true, default: "" },
    dailyBonus: { type: Number, trim: true, default: 0 },
    directBonus: { type: Number, trim: true, default: 0 },
    levelBonus: { type: Number, trim: true, default: 0 },
    myreferrals: { type: Array, trim: true, default: [] },
    team: { type: Array, trim: true, default: [] },
    directReferrals: { type: Number, trim: true, default: 0 },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);