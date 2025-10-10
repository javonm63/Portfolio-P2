export function flLogout(req, res) {
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
    res.clearCookie('flinvid', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.clearCookie('flclntid', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.clearCookie('flid', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.clearCookie('company', {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
    }),
    res.status(200).json({message: 'cookies cleared'})
}