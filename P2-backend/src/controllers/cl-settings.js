import hashPass from "../utils/pwHashingHelper.js"
import pool from "../config/db.js"

export function makeClProfile() {
    console.log('add company info to database + set app settings as cookie or cache')
}

export async function editClProfile(req, res) {
    const flid = req.cookies.id
    const {editName, editEmail, editPhone, editPass, comp} = req.body
    if (comp === 'no') {
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
    } else {
        const {street, city, state, zip, cardNumber, expiration, cvc, comp2} = req.body
        const values2 = [street, city, state, Number(zip)]
        const fields2 = [`street = $${1}`, `city = $${2}`, `state = $${3}`, `zip = $${4}`, `name = $${5}`]
        let index2 = fields2.length
        if (cardNumber && cardNumber.trim() !== '') {
            const num= cardNumber.slice(-4)
            fields2.push(`card = $${index2++}`, `num = $${index2++}`)
            values2.push(cardNumber, num)
        }
        if (expiration && expiration.trim() !== '') {
            fields2.push(`expiration = $${index2++}`)
            values2.push(expiration)
        }
        if (cvc && cvc.trim() !== '') {
            fields2.push(`cvc = $${index2++}`)
            values2.push(cvc)
        }
        values2.push(flid)
        console.log(values2, index2)
        const query2 = `UPDATE company SET ${fields2.join(', ')} WHERE name = $${index2} RETURNING *`
        const value2 = values2
        const updateCompany = await pool.query(query2, value2)
        return res.status(200).json({message: 'company updated'})
    }

// create logic to verify user, update hash and update pass in database
}

export async function getClAppSettings(req, res) {
    try {
        const flid = req.cookies.id
        const prolfieQuery = `SELECT * FROM users WHERE id = $1`
        const profileValue = [flid]
        const getProfile = await pool.query(prolfieQuery, profileValue)
        const profileDatabase = getProfile.rows[0]
        const {id, company, pass, role, invdb, cldb, paidid, ...rest} = profileDatabase 
        const query = `SELECT * FROM company WHERE name = $1`
        const value = [flid]
        const getCompany = await pool.query(query, value)
        const database = getCompany.rows[0]
        const {name, card, cardexp, cvc, ...rest2} = database
        console.log('send app settings from cookies to invoice page in the frontend')
        return res.status(200).json({rest, rest2})
    } catch (err) {
        console.error(err)
        return res.status(500).json({err, message: 'Server Error'})
    }
}