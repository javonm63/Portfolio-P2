import pool from "../config/db.js"
async function existingUsr(req, res, next) {
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
            return res.json({message: 'User Already Exist'})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Server Error'})
    }
}

export default existingUsr