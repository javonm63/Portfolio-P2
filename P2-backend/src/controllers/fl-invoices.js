import {v4 as uuidv4} from 'uuid'
import pool from '../config/db.js'

let items = []
async function createInvoice(req, res) {
    console.log('incoming data: ', req.body)
    const comp = req.body.comp
    const item = {}
    if (comp === 'no') {
        item.item = req.body.item
        item.descript = req.body.descript
        item.quantity = req.body.quantity
        item.price = req.body.price
        items.push(item)
    } else if (comp === 'yes') {
        const name = req.body.name
        const date = req.body.date
        const due = req.body.dueDate
        const id = req.body.id || uuidv4()
        const item = [...items]
        const notes = req.body.notes
        const fees = req.body.fees || 0
        const discounts = req.body.discounts || 0
        const coupons = req.body.coupons || 0

        const query = `
            INSERT INTO invoices
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
            `
        const values = [id, name, date, due, JSON.stringify(item), notes, Number(fees), Number(discounts), Number(coupons)]
        const sendToDb = await pool.query(query, values)

        items = []
    }
    
}

export default createInvoice