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

export {navbarHooks, searhbarHooks}