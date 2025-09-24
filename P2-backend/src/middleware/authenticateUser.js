import jwt from 'jsonwebtoken'

function authentUser(...allowedRoles) {
    return (req, res, next) => {
        const SECRET = process.env.JWT_SECRET
        const token = req.cookies.accessToken
        if (!token) {
            return res.status(403).json({meesage: 'no token'})
        }
        
        const decoded = jwt.verify(token, SECRET)
        if (!allowedRoles.includes(decoded.role)) {
            return res.status(403).json({message: 'Unauthorized user'})
        }
        next()
    }
}

export default authentUser


// AUTHENTICATE THE CSRF HEADER AS WELL AS TOKEN
