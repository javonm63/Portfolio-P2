import { useState } from "react"

function showLandingBarHook() {
    const [showLandingBar, setShowLandingBar] = useState(false)
    return {showLandingBar, setShowLandingBar}
}

export { showLandingBarHook }