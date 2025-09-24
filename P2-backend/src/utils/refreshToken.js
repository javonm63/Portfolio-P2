import jwt from 'jsonwebtoken'

function refreshToken(req, res) {
    const REF_SECRET = process.env.JWT_SECRET_REF
    const SECRET = process.env.JWT_SECRET
    const refreshToken = req.cookies.refresh
    const token = req.cookies.accessToken
    const csrfToken = req.cookies.csrfToken
    const authHeader = req.headers['x-csrf-token']

    if (token) {
        return res.json({message: 'nothing to worry about here'})
    }

    if (!csrfToken) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    if (!authHeader) {
        return res.status(401).json({ message: 'No authorization header' });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(400).json({ message: 'Malformed authorization header' });
    }

    const decoded = jwt.verify(refreshToken, REF_SECRET)
    const accessToken = jwt.sign(
        {id: decoded.id, role: decoded.role},
        SECRET,
        {expiresIn: '15m'}
    )

    return res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 900000,
    })
        .status(201).json({message: 'Yay it worked'})
}

export default refreshToken


// UPDATE REFRESH TOKEN TO REGENERATE A NEW ONE AFTER ACCESS TOKEN HAS BEEN REFRESHED