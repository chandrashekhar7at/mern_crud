import mongoose from "mongoose";

const connectDB = async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            dbname : process.env.DB_NAME
        }
        await mongoose.connect(DATABASE_URL)
        console.log('connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB