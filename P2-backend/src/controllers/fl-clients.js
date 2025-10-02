import { v4 as uuidv4 } from 'uuid'
import pool from '../config/db.js'

export async function flClients(req, res) {
    const flClntID = req.cookies.flclntid
    const {name, email, phone, city} = req.body
    const id = uuidv4()
    const flCLID = email

    try {const query = `
        UPDATE usertables 
        SET database = database || jsonb_build_object($1::text, $2::jsonb)
        WHERE id = $3
        RETURNING *;
        `
        const values = [flCLID, JSON.stringify({id, name, email, phone, city}), flClntID]
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

export async function editClientInfo(req, res) {
    let curClient
    const {name,  email, phone, city} = req.body
    const flClntID = req.cookies.flclntid
    const clientEmail = req.body.client
    const query = `SELECT * FROM usertables WHERE id = $1`
    const value = [flClntID]
    const getClients = await pool.query(query, value)
    const database = getClients.rows[0].database
    for (const [key, value] of Object.entries(database)) {
        if (key === clientEmail) {
            curClient = value
            delete database[key]
        }
    }
    if (name !== '') {
        curClient.name = name
    } else if (email !== '') {
        curClient.email = email
    } else if (phone !== '') {
        curClient.phone = phone
    } else if (city !== '') {
        curClient.city = city
    }
    database[clientEmail] = curClient

    const newQuery = `
    UPDATE usertables 
    SET database = $1::jsonb
    WHERE id = $2
    RETURNING *;
    `
    const newValue = [JSON.stringify(database), flClntID]
    const updateClientInfo = await pool.query(newQuery, newValue)
    return res.status(200).json({message: 'client information updated', data: getClients.rows})
}

export async function deleteClient(req, res) {
    const flClId = req.cookies.flclntid
    const curClientEm = req.body.clid
    console.log(curClientEm)
    const query = `SELECT * FROM usertables WHERE id = $1`
    const value = [flClId]
    const getClients = await pool.query(query, value) 
    const database = getClients.rows[0].database
    for (const [key, value] of Object.entries(database)) {
        if (key === String(curClientEm)) {
            delete database[key]
        }
    }
    console.log(database)
    const newQuery = `
    UPDATE usertables
    SET database = $1::jsonb
    WHERE id = $2
    RETURNING *;
    `
    const newValue = [database, flClId]
    const updateClients = await pool.query(newQuery, newValue)
    return res.status(200).json({message: 'client deleted', data: getClients.rows})
}