import cookieParser from "cookie-parser";
import express from "express";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv"
import userRouter from './routes/user.route.js'

dotenv.config({})

const app = express()
await connectDb()

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res) => {
    res.send("Hello")
} )

app.use('/api/user',userRouter)

app.listen(3000,() => {
    console.log("Server Started")
})