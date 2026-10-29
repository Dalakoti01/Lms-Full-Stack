
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({})

export function isAuthenticated(req,res,next){
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message : "Token Cannot be retrieved",
                success : false
            })
        }

        const userId = jwt.decode(token,process.env.secret_key)
        req.id = userId

        next()


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}