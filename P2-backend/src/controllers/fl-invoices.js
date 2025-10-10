import {v4 as uuidv4} from 'uuid'
import pool from '../config/db.js'

let items = []
export async function createInvoice(req, res) {
    const fliD = req.cookies.flid
    const flInvID = req.cookies.flinvid
    const invId = req.body.invId
    const comp = req.body.comp
    const data = req.body
    const item = {}
    if (!comp) {
        try {
            const invDatabse = await pool.query(`SELECT * FROM usertables WHERE id = $1`, [flInvID])
            const clientToSend = await pool.query('SELECT * FROM users WHERE email = $1', [data.sendCL])
            const database = invDatabse.rows[0]
            const invoices = database.database
            const sendingInv = Object.entries(invoices).find(([key , value]) => key === invId) 
            const inv = sendingInv[1]
            inv.flInvID = flInvID
            const sendingClient = clientToSend.rows[0]
            if (sendingClient === undefined) {
                return res.status(500).json({error: "client doesn't have a fli account"})
            }
            const merchQuery = `SELECT * FROM users WHERE id = $1`
            const merchValue = [fliD]
            const getUser = await pool.query(merchQuery, merchValue)
            const merchData = getUser.rows[0]
            const {id, pass, role, invdb, cldb, paidid, ...rest} = merchData
            inv.merch = rest
            console.log(inv)

            const query = `
            UPDATE usertables
            SET database = database || $1::jsonb
            WHERE id = $2
            RETURNING *`
            const values = [JSON.stringify({[data.invId]: inv}), sendingClient.id]
            const send = await pool.query(query, values)
            inv.stat = 'Sent'
            const updatedInv = inv
            const newQuery = `
            UPDATE usertables
            SET database = jsonb_set(
            database, 
            ARRAY [$1:: text], 
            $2::jsonb,
            true)
            WHERE id = $3`
            const updateVals = [invId, inv , flInvID]
            const updateInv = await pool.query(newQuery, updateVals)
            const when = new Date().toISOString()
            const notif = `Invoice #${invId} sent.`
            const index = Math.floor(Math.random() * 3000)
            const notifQuery = `UPDATE notifications SET notifs = notifs || jsonb_build_object($1::text, $2::jsonb) WHERE id = $3 RETURNING *`
            const notifValue = [index, JSON.stringify({notif, when}), fliD]
            const sendNotifToDb = await pool.query(notifQuery, notifValue)
            return res.status(200).json({invId: inv.invId, name: inv.name, total: inv.total, stat: inv.stat, flInvID, message: {notif: notif, when: when}})
        } catch (err) {
            console.error(err)
        }
    }
    if (comp === 'no') {
        const item = {}
        item.item = req.body.item
        item.descript = req.body.descript
        item.quantity = req.body.quantity
        item.price = req.body.price
        items.push(item)
        console.log(items)
    } else if (comp === 'yes') {
        console.log(items)

        const invId = Math.floor(Math.random() * 2000)
        const name = req.body.name
        const date = req.body.date
        const due = req.body.dueDate
        const id = req.body.id || uuidv4()
        const item = [...items]
        const notes = req.body.notes
        const fees = req.body.fees || 0
        const discounts = req.body.discount || 0
        const coupons = req.body.coupons 
        const totalObj = item[0]
        const total = Number(totalObj.price) + Number(fees) + Number(discounts)
        let stat = 'Waiting'
        try {
            const query = `
                UPDATE usertables 
                SET database = database || jsonb_build_object($1::text, $2::jsonb)
                WHERE id = $3
                RETURNING *;
                `
            const values = [invId, JSON.stringify({id, name, date, due, item, notes, fees, invId, discounts, coupons, total, stat}), flInvID]
            const sendToDb = await pool.query(query, values)
        } catch (err) {
            console.error(err)
        }
        items = []
        return res.status(201).json({invId: invId, name, total, stat})
    }
    
}

export async function sendData(req, res) {
    const flInvID = req.cookies.flinvid
    const query = `
    SELECT * FROM usertables WHERE id = $1`
    const getData = await pool.query(query, [flInvID])
    const data = getData.rows[0]
    const database = data.database
    const dataArr = []
    if (Object.entries(database).length === 0) {
        return res.status(200).json({message: "user hasn't made any invoices yet"})
    } else {
        for (const value of Object.values(database)) {
            const {invId, name, total, stat, due} = value
            dataArr.push({invId, name, total, stat, due})
        }
    }
    return res.status(200).json({data: dataArr})
}

export async function sendInv(req, res) {
    const flInvID = req.cookies.flinvid
    const query = `SELECT * FROM usertables WHERE id = $1`
    const getInv = await pool.query(query, [flInvID])
    const database = getInv.rows[0]
    const invoices = database.database
    return res.status(200).json({data: invoices})
}

export async function deleteInv(req, res) {
    const invToDel = req.body.data
    const flInvID = req.cookies.flinvid
    const query = `SELECT * FROM usertables WHERE id = $1`
    const value = [flInvID]
    const getInv = await pool.query(query, value)
    const database = getInv.rows[0].database
    for (const [key, value] of Object.entries(database)) {
        if (key === invToDel) {
            delete database[key]
        }
    }
    const newQuery = `UPDATE usertables SET database = $1 WHERE id = $2 RETURNING *;`
    const newValue = [database, flInvID]
    const updateDatabase = await pool.query(newQuery, newValue)
    return res.status(200).json({message: 'invoice deleted'})
}

export async function draftInv(req, res) {
    const flInvID = req.cookies.flinvid
    const invId = Math.floor(Math.random() * 2000)
    const name = req.body.name
    const date = req.body.date
    const due = req.body.dueDate
    const id = req.body.id || uuidv4()
    const item = [...items]
    const notes = req.body.notes
    const fees = req.body.fees || 0
    const discounts = req.body.discount || 0
    const coupons = req.body.coupons 
    let total;
    if (item.length > 0) {
        const totalObj = item[0]
        total = Number(totalObj.price) + Number(fees) + Number(discounts)
    } else {
        total = 'not yet calculated'
    }
    let stat = 'Draft'
    const query = `
    UPDATE usertables 
    SET database = database || jsonb_build_object($1::text, $2::jsonb)
    WHERE id = $3
    RETURNING *;
    `
    const value = [invId, JSON.stringify({name, date, due, id, item, notes, fees, discounts, coupons, total, stat, invId}), flInvID]
    const sendDraft = await pool.query(query, value)
    return res.status(200).json({message: 'invoice drafted'})
}

export async function getDrafts(req, res) {
    const flInvID = req.cookies.flinvid
    const query = `SELECT * FROM usertables WHERE id = $1`
    const value = [flInvID]
    const getDrafts = await pool.query(query, value)
    const database = getDrafts.rows[0].database
    const groups = {}
    for (const [key, nested] of Object.entries(database)) {
        const value = nested.stat
        if (value === 'Draft') {
            if (!groups[value]) {
                groups[value] = {}
            }
            groups[value][key] = nested
        } else {
            console.log('nope')
        }
    }
    return res.status(200).json({data: groups})
}

export async function deleteDraft(req, res) {
    const flInvID = req.cookies.flinvid
    const invId = req.body.invId
    const query = `SELECT * FROM usertables WHERE id = $1`
    const value = [flInvID]
    const getDrafts = await pool.query(query, value)
    const database = getDrafts.rows[0].database
    for (const [key, value] of Object.entries(database)) {
        if (key === invId) {
            delete database[key]
        }
    }
    const newQuery = `UPDATE usertables SET database = $1 WHERE id = $2 RETURNING *;`
    const newValue = [database, flInvID]
    const updateDatabase = await pool.query(newQuery, newValue)
    return res.status(200).json({message: 'draft deleted'})
}
    
const reports = []
export function saveReports(req, res) {
    let post
    if (req.body) {
        post = req.body.post
    }
    if (post) {
        const {earned, unpaid, overdue, paidReport} = req.body
        if (reports.length > 0) {
            reports.pop()
            reports.push({earned, unpaid, overdue, paidReport})
        } else {
            reports.push({earned, unpaid, overdue, paidReport})
        }
        return res.status(200).json({message: 'reports saved'})
    } else if (post === undefined) {
        if (reports.length === 0) {
            reports.push({earned: 0, unpaid: 0, overdue: 0, paidReport: 0})
        }
        return res.status(200).json({data: reports[0]})
    }
}