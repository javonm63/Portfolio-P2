import hashPass from "../utils/pwHashingHelper.js"
import pool from "../config/db.js"

export function makeProfile() {
    console.log('add company info to database + set app settings as cookie or cache')
}

export async function editProfile(req, res) {
    const flid = req.cookies.flid
    const {editName, editEmail, editPhone, editPass} = req.body
    console.log(editName)
    const fields = []
    const values = []
    let index = 1
    if (editName && editName.trim() !== '') {
      fields.push(`name = $${index++}`)
      values.push(editName.trim())
    }

    if (editEmail && editEmail.trim() !== '') {
      fields.push(`email = $${index++}`)
      values.push(editEmail.trim())
    }

    if (editPhone && editPhone.trim() !== '') {
      fields.push(`phone = $${index++}`)
      values.push(editPhone.trim())
    }
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields provided to update' })
    }
    values.push(flid)
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, name, email, phone`
    const getProfile = await pool.query(query, values)
    if (getProfile.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json({message: 'profile updated'})
// create logic to verify user, update hash and update pass in database
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