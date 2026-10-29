import mongoose from "mongoose";

export async function connectDb(){
    try {
        await mongoose.connect(process.env.Mongo_Uri)
        console.log("Mongodb Connected Successfully")
    } catch (error) {
        console.log(error);
        
    }
}