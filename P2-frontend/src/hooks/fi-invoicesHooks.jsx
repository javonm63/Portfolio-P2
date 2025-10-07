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
function showMerchHook() {
    const [showMerch, setShowMerch] = useState(false)
    return {showMerch, setShowMerch}
}
function sendInvHook() {
    const [sendPopup, setSendPopup] = useState(false)
    const [inv, setInv] = useState('')
    const [sendCL, setSendCL] = useState('')
    return {sendPopup, setSendPopup, inv, setInv, sendCL, setSendCL}
}
function sendToHooks() {
    const [sendTo, setSendTo] = useState([])
    return {sendTo, setSendTo}
}
function viewInvHooks() {
    const [viewInv, setViewInv] = useState(false)
    const [viewInvData, setViewInvData] = useState([])
    return {viewInv, setViewInv, viewInvData, setViewInvData}
}
function showDraftInvsHooks() {
    const [showDraftInvs, setShowDraftInvs] = useState([])
    return {showDraftInvs, setShowDraftInvs}
}

function loadDraftHooks() {
    const [loadDraft, setLoadDraft] = useState([])
    const [loadDft, setLoadDft] = useState(false)
    return {loadDraft, setLoadDraft, loadDft, setLoadDft}
}
function reportsHooks() {
    const [reports, setReports] = useState([])
    return {reports, setReports}
}

export {
    showMoreHook, 
    pageBodyHeight, 
    showSendPage, 
    showAllPage, 
    showNewPage, 
    showDraftsPage, 
    showSendPage2, 
    showMerchHook, 
    sendInvHook, 
    sendToHooks, 
    viewInvHooks, 
    showDraftInvsHooks,
    loadDraftHooks,
    reportsHooks,
}