import { useState } from "react";

function flAddClientHooks() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [dispClient, setDispClient] = useState([])
    const [send, setSend] = useState(false)
    return { name, setName, email, setEmail, phone, setPhone, city, setCity, dispClient, setDispClient, send, setSend}
}
function showAlertHooks() {
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    return {showAlert, setShowAlert, alertText, setAlertText}
}


export { flAddClientHooks, showAlertHooks}