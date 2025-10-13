export function clLogout(req, res) {
    console.log('hi')
    return res.clearCookie('csrfToken', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.clearCookie('refresh', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.clearCookie('accessToken', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.clearCookie('id', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.clearCookie('paidId', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.status(200).json({message: 'cookies cleared'})
}