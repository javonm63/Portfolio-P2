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
    const paidId = 'nothing to see here'
    const invoicesDBid = genUserId()
    const clientsDBid = genUserId()

    const hashed = await hashPass(pass)

    try {
        const makeDb = `
        INSERT INTO usertables (id, database)
        VALUES ($1, $2)
        RETURNING *;`
        const dbValues = [invoicesDBid, []]
        const makingDb = await pool.query(makeDb, dbValues)
        const makeDb2 = `
        INSERT INTO usertables (id, database)
        VALUES ($1, $2)
        RETURNING *;`
        const dbValues2 = [clientsDBid, []]
        const makingDb2 = await pool.query(makeDb2, dbValues2)

        const query = `
        INSERT INTO users (id, name, company, email, phone, pass, role, invdb, cldb, paidid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;`
        const values = [id, name, company, email, phone, hashed, role, invoicesDBid, clientsDBid, paidId]
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
        .cookie('flinvid', invoicesDBid, {
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
    .cookie('flid', id, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .status(201).json({message: 'freelancer account created', role: 'freelancer'})
} 

