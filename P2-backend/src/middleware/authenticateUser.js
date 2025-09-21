import jwt from 'jsonwebtoken'

function authentUser(req, res, next) {
    const SECRET = process.env.JWT_SECRET

    const authHeader = req.cookies.token
    if (!authHeader) return (res.status(401).json({message: 'Unauthorized user'}))

    try {
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({message: 'Invalid token'})
    }
}

export default authentUser
