import pool from "../config/db.js"

export default function FlSignup(req, res) {
    const userInfo = req.body
    console.log(userInfo)
    res.status(200).json({message: 'freelancer account created'})
} 