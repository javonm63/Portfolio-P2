import { useState } from "react"

function showLandingBarHook() {
    const [showLandingBar, setShowLandingBar] = useState(false)
    return {showLandingBar, setShowLandingBar}
}
function showSignUpHook() {
    const [showSignup, setShowSignup] = useState(false)
    return {showSignup, setShowSignup}
}

export { showLandingBarHook, showSignUpHook }