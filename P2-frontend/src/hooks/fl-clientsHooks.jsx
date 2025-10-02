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
function showEditClientPopHooks() {
    const [showEditPop, setShowEditPop] = useState(false)
    const [clid, setclid] = useState(null)
    return {showEditPop, setShowEditPop, clid, setclid}
}


export { flAddClientHooks, showAlertHooks, showEditClientPopHooks}