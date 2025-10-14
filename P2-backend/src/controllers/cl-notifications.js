import pool from "../config/db.js";

export async function getNotifs(req, res) {
    try {
        const iD = req.cookies.id
        const query = `SELECT * FROM notifications WHERE id = $1`
        const value = [iD]
        const getNotifs = await pool.query(query, value)
        if (getNotifs.rows.length === 0) {
            return res.status(200).json({message: 'No notifications'})
        } else {
            const database = getNotifs.rows[0].notifs
            return res.status(200).json({data: database})
        }
        
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Server Error.'})
    }
}

export async function clearNotifs(req, res) {
    const id = req.cookies.id
    try {
        const query = `UPDATE notifications SET notifs = $1::jsonb WHERE id = $2 RETURNING *`
        const value = [JSON.stringify({}), id]
        const clearNotifDb = await pool.query(query, value)
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Server Error'})
    }
    return res.status(200).json({message: 'Your notifications were cleared successfully, reload page to see changes.'})
}