import bcrypt from 'bcrypt'

const hashPass = async (Pass) => {
    const saltRounds = 5
    const hashedPass = await bcrypt.hash(Pass, saltRounds)
    return hashedPass
}

export default hashPass