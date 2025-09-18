import { useState } from "react"

function showLandingBarHook() {
    const [showLandingBar, setShowLandingBar] = useState(false)
    return {showLandingBar, setShowLandingBar}
}
function showSignUpHook() {
    const [showSignup, setShowSignup] = useState(false)
    return {showSignup, setShowSignup}
}
function showLoginHook() {
    const [showLogin, setShowLogin] = useState(false)
    return {showLogin, setShowLogin}
}
function showLandingMenuHook() {
    const [showLMenu, setShowLMenu] = useState(false)
    return {showLMenu, setShowLMenu}
}
function showDarkModeHook() {
    const [darkMode, setDarkMode] = useState(false)
    return {darkMode, setDarkMode}
}

export { showLandingBarHook, showSignUpHook, showLoginHook, showLandingMenuHook, showDarkModeHook }