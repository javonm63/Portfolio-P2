import {  useState } from 'react'

function showMoreHook() {
    const [showMoreInfo, setShowMoreInfo] = useState(false)
    return {showMoreInfo, setShowMoreInfo}
}

function pageBodyHeight() {
    const [bodyHeight, setBodyHeight] = useState(false)
    return {bodyHeight, setBodyHeight}
}
function showSendPage() {
    const [showSend, setShowSend] = useState(false)
    return {showSend, setShowSend}
}
function showAllPage() {
    const [showAll, setShowAll] = useState(false)
    return {showAll, setShowAll}
}
function showNewPage() {
    const [showNew, setShowNew] = useState(true)
    return {showNew, setShowNew}
}


export {showMoreHook, pageBodyHeight, showSendPage, showAllPage, showNewPage}