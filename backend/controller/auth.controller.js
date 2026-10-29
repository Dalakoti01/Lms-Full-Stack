import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({})

const secret_key = process.env.secret_key

export async function register(req,res){
    try {
        const {email , fullName, password} = req.body;
        if(!email || !fullName || !password){
            return res.status(400).json({
                message : "Some fields are missing ",
                success : false
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message : "User Already Registered with this email",
                success : false
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

       const newUser =  await User.create({email,password : hashedPassword, fullName})
       if(!newUser){
        return res.status(400).json({
            message : "User Cannot be Created",
            success : false
        })
       }
       return res.status(201).json({
        message : "User Created Successfully",
        success : true
       })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}


export async function login(req,res){
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }

        const existingUser = await User.findOne({email}).select("+password")
        if(!existingUser){
            return res.status(404).json({
                message :"User Not Found Please Register First",
                success : false
            })
        }

        const validPassword = await bcrypt.compare(password,existingUser.password)
        if(!validPassword){
            return res.status(401).json({
                message : "Invalid email or password",
                success : false
            })
        }

        const token = jwt.sign({userId:existingUser._id},secret_key)
        if(!token){
            return res.status(401).json({
                message : "Token Cannot be Generates",
                success : false
            })
        }

        res.cookie("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
     
      })
        return res.status(200).json({
            message : "User Created Successfully",
            success : true,
            existingUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
    }
}

export async function logout(req,res){
    try {
        return res.clearCookie("token").status(200).json({
            message : "User Logged Out",
            success : true

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
        
    }
}

export async function getAllUser(req,res){
    try {
        const allUser = await User.find()
        return res.status(200).json({
            message : "Users Fetched Successfully",
            success : true,
            allUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
        
    }
}



