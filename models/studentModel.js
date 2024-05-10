import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
},{timestamps:true})

const userModel = mongoose.model('dataCenter',userSchema)

export default userModel