/*
Express server is required

*/
const { json } = require("express")
const express = require("express")
const router = express.Router()
//here we import all the controller functions to be used with api end points in this router
const {Login, Register, verifyEmail, forgotPassword, resetPassword} = require("../controllers/auth")
//user middleware import
const { isResetTokenValid } = require("../middlewares/user")

//Auth router
router.post("/register", Register)
router.post("/login", Login)
router.get("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", isResetTokenValid, resetPassword)
router.get("/verify-token", isResetTokenValid, (req, res) =>{
 res.json({success: true})
})
//export the router as route
module.exports = router