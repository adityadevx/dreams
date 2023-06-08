import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        console.log("Using current connection");
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("New connection");
    return handler(req, res);
}

export default connectDb;