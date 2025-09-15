import {  useState } from 'react'

function showMoreHook() {
    const [showMoreInfo, setShowMoreInfo] = useState(false)
    return {showMoreInfo, setShowMoreInfo}
}

function showSendPage() {
    const [showSend, setShowSend] = useState(false)
    return {showSend, setShowSend}
}

export {showMoreHook, showSendPage}