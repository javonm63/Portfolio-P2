import pool from "../config/db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function flLogin(req, res) {
    const SECRET = process.env.JWT_SECRET

    const {email, pass} = req.body

    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
        [email])
        if (result.rowCount === 0) {
            return res.status(401).json({message: 'No account'})
        }
        const user = result.rows[0]
        const validPass = await bcrypt.compare(pass, user.pass)
        if (!validPass) {
            return res.status(401).json({message: 'Invalid credentials'})
        }
        const token = jwt.sign({id: user.id, role: user.role}, SECRET, {expiresIn: "1h"})
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1800000
        })
        res.json({message: 'Logged in successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: 'Server error'})
    }
}

export default flLogin