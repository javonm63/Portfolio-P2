import {  useState } from 'react'

function displayNotifsHooks() {
    const [dispNotifs, setDispNotifs] = useState([])
    const [dispNalert, setDispNalert] = useState(false)
    return {dispNotifs, setDispNotifs, dispNalert, setDispNalert}
}

export {displayNotifsHooks}