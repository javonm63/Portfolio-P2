import pool from "../config/db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

async function flLogin(req, res) {
    const SECRET = process.env.JWT_SECRET
    const REF_SECRET = process.env.JWT_SECRET_REF

    const {email, pass, role} = req.body

    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
        [email])
        if (result.rowCount === 0) {
            return res.status(401).json({message: 'No account'})
        }
        const user = result.rows[0]
        const invoicesDBid = user.invdb
        const clientsDBid = user.cldb
        const validPass = await bcrypt.compare(pass, user.pass)
        if (!validPass) {
            return res.status(401).json({message: 'Invalid credentials'})
        }
        const id = user.id
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
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .cookie('refresh', refreshToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .cookie('accessToken', accessToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            maxAge: 900000,
        })
            .cookie('id', id, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .cookie('flclntid', clientsDBid, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .cookie('flinvid', invoicesDBid, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(201).json({role: role, message: 'Logged in successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).json({err, error: 'Server error'})
    }
}

export default flLogin