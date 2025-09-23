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
function flInvoicesHooks() {
    const [item, setItem] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [notes, setNotes] = useState('')
    const [fees, setFees] = useState('')
    const [discount, setDiscount] = useState('')
    const [coupon, setCoupon] = useState('')
    const [id, setId] = useState('')
    const [displayItem, setDisplayItem] = useState([])
    const [isItem, setIsItem] = useState(false)
    return { 
        item, setItem,
        description, setDescription, 
        quantity, setQuantity, 
        price, setPrice, 
        name, setName, 
        date, setDate, 
        dueDate, setDueDate,
        notes, setNotes,
        fees, setFees, 
        discount, setDiscount,
        coupon, setCoupon,
        id, setId,
        displayItem, setDisplayItem,
        isItem, setIsItem
    }
}

export { flSignupHooks, showAlertHooks, flInvoicesHooks }