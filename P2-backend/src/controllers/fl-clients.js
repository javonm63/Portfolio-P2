import { v4 as uuidv4 } from 'uuid'
import pool from '../config/db.js'

export async function flClients(req, res) {
    const flClntID = req.cookies.flclntid
    const {name, email, phone, city} = req.body
    const id = uuidv4()

    try {const query = `
        UPDATE usertables 
        SET database = database || $1::jsonb
        WHERE id = $2
        RETURNING *;
        `
        const values = [JSON.stringify({flclient: {id, name, email, phone, city}}), flClntID]
        const sendToDb = await pool.query(query, values)
    } catch (err) {
        console.error(err)
    }

    return res.status(200).json({name, email, phone, city})
}

export async function sendClientData(req, res) {
    const flClntID = req.cookies.flclntid
    const query = `
    SELECT * FROM usertables WHERE id = $1`
    const getData = await pool.query(query, [flClntID])
    if (getData.rowCount > 0) {
        const database = getData.rows
        return res.status(200).json({data: database})
    } else {
        return res.status(200).json({message: "user hasn't made any invoices yet"})
    }
}