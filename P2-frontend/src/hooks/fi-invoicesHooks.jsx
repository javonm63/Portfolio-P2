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
function showDraftsPage() {
    const [showDraft, setShowDraft] = useState(false)
    return {showDraft, setShowDraft}
}
function showSendPage2() {
    const [showSend2, setShowSend2] = useState(true)
    return {showSend2, setShowSend2}
}


export {showMoreHook, pageBodyHeight, showSendPage, showAllPage, showNewPage, showDraftsPage, showSendPage2}