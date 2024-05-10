import userModel from "../models/studentModel.js";

export const createUser = async(req,res)=>{
    try {
        const {username , email , phone} = req.body
        const doc = new userModel({
            username,email,phone
        })
        const result = await doc.save()
        if(result){
            res.status(201).json({success:'true',message:'user created successfully',result})
        }
    } catch (error) {
        res.status(200).json({success:'false',message:'can\'t create user '})
        // console.log(error)
    }
}
export const getUsers = async(req,res)=>{
    try {
        const result = await userModel.find();
        if(result){
            res.status(201).json({success:'true',message:'user found',result})
        }
    } catch (error) {
        res.status(200).json({success:'false',message:'invalid user'})
    }
}
export const getUsersbyid = async(req,res)=>{
    try {
        const result = await userModel.findById(req.params.id);
        if(result){
            res.status(201).json({success:'true',message:'user found',result})
        }
    } catch (error) {
        res.status(200).json({success:'false',message:'invalid user'})
    }
}
export const updateUser = async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id)
        const result = await userModel.findByIdAndUpdate(id,req.body)
        if(result){
            res.status(201).json({success:'true',message:'user updated successfully'})
        }
    } catch (error) {
        res.status(200).json({success:'false',message:'cant update user'})
    }
}

export const deleteuser = async(req,res)=>{
    try {
        const result = await userModel.findByIdAndDelete(req.params.id)
        if(result){
            res.status(201).json({success:'true',message:'user deleted successfully'})
        }
        // res.status(200).json({success:'false',message:'cant delete successful'})
    } catch (error) {
        res.status(200).json({success:'false',message:'cant delete successful'})
    }
} 