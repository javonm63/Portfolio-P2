import { useState } from "react";

function flSignupHooks() {
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    return { name, setName, company, setCompany, email, setEmail, phone, setPhone, pass, setPass, confirmPass, setConfirmPass }
}
function showAlertHooks() {
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    return {showAlert, setShowAlert, alertText, setAlertText}
}

export { flSignupHooks, showAlertHooks }