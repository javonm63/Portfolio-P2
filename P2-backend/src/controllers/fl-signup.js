import pool from "../config/db.js"
import jwt from 'jsonwebtoken'
import genUserId from "../utils/genUserId.js"
import hashPass from "../utils/pwHashingHelper.js"
import { v4 as uuidv4 } from 'uuid'

export default async function FlSignup(req, res) {
    const SECRET = process.env.JWT_SECRET
    const REF_SECRET = process.env.JWT_SECRET_REF

    const {name, company, email, phone, pass, role} = req.body
    const id = genUserId()
    console.log('user id: ', id)

    const hashed = await hashPass(pass)
    console.log('hashed pass: ', hashed)

    try {
        const query = `
        INSERT INTO users (id, name, company, email, phone, pass, role)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`
        const values = [id, name, company, email, phone, hashed, role]
        const sendToDb = await pool.query(query, values)
    } catch (err) {
        console.error(err)
        return res.json({errors: "Server error"})
    }

    const csrfToken = uuidv4()

    const accessToken = jwt.sign(
        {id: id, role: role},
        SECRET,
        {expiresIn: "15m"}
    )
    const refreshToken = jwt.sign(
        {id: id, role: role},
        REF_SECRET,
        {expiresIn: "7d"}
    )
    return res.cookie('csrfToken', csrfToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .cookie('refresh', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 900000,
    })
        .status(201).json({message: 'freelancer account created', role: 'freelancer'})
} 

