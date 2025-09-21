import { v4 as uuidv4 } from 'uuid'

function genUserId() {
    const id = uuidv4()
    return id
}

export default genUserId