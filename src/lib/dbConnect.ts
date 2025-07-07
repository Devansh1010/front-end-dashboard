import mongoose from "mongoose";

//New Version:- 

 const MONGODB_URI ="mongodb+srv://vivekpraj2912:RxAqHe76s8lIUZWa@hfiles.l7gzc0q.mongodb.net/";

 if(!MONGODB_URI) {
    throw new Error("Please define mongodb uri on the env file.")
 }

 let cached = global.mongoose;

 if(!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
 }

 export async function dbConnect() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = mongoose
        .connect(MONGODB_URI)
        .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }
    console.log("DB Connected")
    return cached.conn
 }
