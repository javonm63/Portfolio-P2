import pool from "../config/db.js"

export function makeProfile() {
    console.log('add company info to database + set app settings as cookie or cache')
}

export function editProfile() {
    console.log('edit user information in database')
}

export async function getAppSettings(req, res) {
    try {
        const flid = req.cookies.flid
        const prolfieQuery = `SELECT * FROM users WHERE id = $1`
        const profileValue = [flid]
        const getProfile = await pool.query(prolfieQuery, profileValue)
        const profileDatabase = getProfile.rows[0]
        const {id, company, pass, role, invdb, cldb, paidid, ...rest} = profileDatabase 
        console.log('send app settings from cookies to invoice page in the frontend')
        return res.status(200).json({rest})
    } catch (err) {
        console.error(err)
        return res.status(500).json({err, message: 'Server Error'})
    }
}