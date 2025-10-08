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