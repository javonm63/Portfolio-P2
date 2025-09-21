import pool from "../config/db.js"
import jwt from 'jsonwebtoken'
import genUserId from "../utils/genUserId.js"
import hashPass from "../utils/pwHashingHelper.js"

export default async function FlSignup(req, res) {
    const SECRET = process.env.JWT_SECRET

    const {name, company, email, phone, pass, role} = req.body
    const id = genUserId()
    console.log('user id: ', id)

    const hashed = await hashPass(pass)
    console.log('hashed pass: ', hashed)

    try {
        const query = `
        INSERT INTO users (id, name, company, email, phone, pass)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`
        const values = [id, name, company, email, phone, hashed]
        const sendToDb = await pool.query(query, values)
    } catch (err) {
        console.error(err)
        return res.json({errors: "Server error"})
    }

    const token = jwt.sign(
        {id: id, role: role},
        SECRET,
        {expiresIn: "1hr"}
    )
    return res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 1800000
    }).status(201).json({message: 'freelancer account created'})
} 

