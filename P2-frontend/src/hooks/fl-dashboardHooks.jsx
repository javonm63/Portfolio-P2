import { useState } from "react"
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

function showGraph() {
    const [showLineGraph, setShowLineGraph] = useState(true)
    return {showLineGraph, setShowLineGraph}
}

export {navbarHooks, searhbarHooks, showGraph}