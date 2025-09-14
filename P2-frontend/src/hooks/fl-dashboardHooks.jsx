import { useState } from "react"
function navbarHooks() { 
    const [showWebNav, setShowWebNav] = useState(true)
    const [sideNav, setSideNav] = useState(false)
    return {showWebNav, setShowWebNav, sideNav, setSideNav}
}

export default navbarHooks