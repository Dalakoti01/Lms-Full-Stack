import express from "express"
import { getAllUser, login, logout, register } from "../controller/auth.controller.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/allUsers',isAuthenticated,getAllUser)
export default router