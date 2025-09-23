import jwt from 'jsonwebtoken'

function authentUser(...allowedRoles) {
    return (req, res, next) => {
        const SECRET = process.env.JWT_SECRET
        const authHeader = req.cookies.token
        if (!authHeader) return (res.status(401).json({message: 'Unauthorized user'}))

        try {
            const decoded = jwt.verify(token, SECRET)
            req.user = decoded
            next()
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({message: 'Forbidden: access denied'})
            }
            next()
        } catch {
            return res.status(401).json({message: 'Invalid token'})
        }
    }
}

export default authentUser
