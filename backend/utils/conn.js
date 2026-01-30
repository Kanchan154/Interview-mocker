import mongoose from "mongoose";

const connectToMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.mongo_dB_URL)
        console.log("connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connectToMongoDB