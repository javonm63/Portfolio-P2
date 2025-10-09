import { useState } from "react";

export function settingsHooks() {
    const [display, setDisplay] = useState(false)
    const [display2, setDisplay2] = useState(false)
    return {display, setDisplay, display2, setDisplay2}
}
export function settingsProfileHooks() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    return {
        name,
        setName,
        email, 
        setEmail,
        phone,
        setPhone,
        pass,
        setPass,
    }
}

export function settingsProfileEditHooks() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    return {
        name,
        setName,
        email, 
        setEmail,
        phone,
        setPhone,
        pass,
        setPass,
    }
}

export function companyInfoHooks() {
    const [address, setAddress] = useState('')
    const [card, setCard] = useState('')
    return {address, setAddress, card, setCard}
}
export function settingsCompanyEditHooks() {
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    return {
        street, setStreet,
        city, setCity,
        state, setState,
        zip, setZip,
    }
}
export function settingsPayEditHooks() {
    const [cardNumber, setCardNumber] = useState('')
    const [expiration, setExpiration] = useState('')
    const [cvc, setCvc] = useState('')
    return {
        cardNumber, setCardNumber,
        expiration, setExpiration,
        cvc, setCvc
    }
}