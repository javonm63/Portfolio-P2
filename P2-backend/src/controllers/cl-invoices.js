import pool from "../config/db.js"
import {stripe} from '../config/stripe.js'

export async function loadClInvs(req, res) {
    const clInvId = req.cookies.id
    const paidId = req.cookies.paidId
    const query = `SELECT * FROM usertables WHERE id = $1`
    const value = [clInvId]
    const getClInvs = await pool.query(query, value)
    const database = getClInvs.rows[0].database
    const newQuery = `SELECT * FROM usertables WHERE id = $1`
    const newValue = [paidId]
    const getPaidInvs = await pool.query(newQuery, newValue)
    const database2 = getPaidInvs.rows[0].database
    return res.status(200).json({data: database, paid: database2})
}

export async function createPayIntent(req, res) {
    const id = req.cookies.id
    if (req.body.comp === 'no') {
        const query = `SELECT * FROM users WHERE id = $1`
        const value = [id]
        const getUser = await pool.query(query, value)
        const user = getUser.rows[0]
        const username = user.name
        try {
            const { amount, currency } = req.body
            const paymentIntent = await stripe.paymentIntents.create({
                amount, 
                currency,
            })
            return res.status(200).json({clientSecret: paymentIntent.client_secret, username})
        } catch (err) {
            console.error(err)
            return res.status(500).json({error: err.message})
        }
    } else if (req.body.comp === 'yes') {
        const invId = req.body.invId
        const clInvId = req.cookies.id
        const clPaidId = req.cookies.paidId
        const query = `SELECT * FROM usertables WHERE id = $1`
        const value = [clInvId]
        const getInvs = await pool.query(query, value)
        const database = getInvs.rows[0].database
        const invoice = []
        for (const [key, value] of Object.entries(database)) {
            if (key === String(invId)) {
                invoice.push(value)
                delete database[key]
            }
        }
        const updateInv = invoice[0]
        updateInv.stat = 'Paid'
        const newQuery = `UPDATE usertables SET database = database || jsonb_build_object($1::text, $2::jsonb) WHERE id = $3 RETURNING *`
        const newValue = [invId, updateInv, clPaidId]
        const sendPaidInv = await pool.query(newQuery, newValue)
        const newQuery2 = `UPDATE usertables SET database = $1::jsonb WHERE id = $2 RETURNING *`
        const newValue2 = [JSON.stringify(database), clInvId]
        const sendPaidInv2 = await pool.query(newQuery2, newValue2)
        const newQuery3 = `SELECT * FROM usertables WHERE id = $1`
        const value3 = [updateInv.flInvID]
        const getFlInvs = await pool.query(newQuery3, value3)
        const database3 = getFlInvs.rows[0].database
        for (const [key, value] of Object.entries(database3)) {
            if (key === String(invId)) {
                value.stat = 'Paid'
            }
        }
        const updateQuery = `UPDATE usertables SET database = $1 WHERE id = $2 RETURNING *`
        const updateValue = [database3, updateInv.flInvID]
        const update = await pool.query(updateQuery, updateValue)
    }
    return res.status(200).json({message: 'invoice paid'})
    
}