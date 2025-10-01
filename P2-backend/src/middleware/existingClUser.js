import pool from "../config/db.js"

const side2 = process.env.CL_SIDE

async function existingClUsr(req, res, next) {
    const email = req.body.email
    try {
        const query = 
            `SELECT *
            FROM users
            WHERE email = $1`
        const values = [email]
        const existingUser = await pool.query(query, values) 
        if (existingUser.rowCount === 0) {
            next()
        } else {
            const user = existingUser.rows[0]
            if (user.role === String(side2)) {
                return res.json({message: 'User Already Exist'})
            } else {
                next()
            }
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Server Error'})
    }
}

export default existingClUsr