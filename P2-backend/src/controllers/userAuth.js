import jwt from 'jsonwebtoken'

function authUser(req, res) {
    try {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('yeah boi')
    return res.json({role: decoded.role})
    } catch (err) {
        console.error(err)
        return res.status(403).json({error: 'Invalid token'})
    }
}

export default authUser