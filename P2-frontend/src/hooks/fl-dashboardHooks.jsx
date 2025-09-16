import { useState } from "react"

function showMenuHook() {
    const [showMenu, setShowMenu] = useState(false)
    return {showMenu, setShowMenu}
}
function showClMenuHook() {
    const [showClMenu, setShowClMenu] = useState(false)
    return {showClMenu, setShowClMenu}
}
function navbarHooks() { 
    const [showWebNav, setShowWebNav] = useState(true)
    const [sideNav, setSideNav] = useState(false)
    return {showWebNav, setShowWebNav, sideNav, setSideNav}
}
function searhbarHooks() { 
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showDisplay, setShowDisplay] = useState(false)
    return {screenWidth, setScreenWidth, showDisplay, setShowDisplay}
}
function showNotifHook() {
    const [showNotif, setShowNotif] = useState(false)
    return {showNotif, setShowNotif}
}
function showGraph() {
    const [showLineGraph, setShowLineGraph] = useState(true)
    return {showLineGraph, setShowLineGraph}
}

export {showMenuHook, showClMenuHook, navbarHooks, searhbarHooks, showNotifHook, showGraph}