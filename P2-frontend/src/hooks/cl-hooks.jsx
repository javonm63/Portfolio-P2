import { useState } from "react";

function displayHooks() {
    const [display, setDisplay] = useState(false)
    const [savedDisp, setSavedDisp] = useState(false)
    const [allDisp, setAllDisp] = useState(false)
    const [merchDisp, setMerchDisp] = useState(false)
    const [viewSaved, setViewSaved] = useState(false)
    const [curInv, setCurInv] = useState([])
    const [invTotal, setInvTotal] = useState('')
    const [cardName, setCardName] = useState('')
    const [invNum, setinvNum] = useState('')
    return {display, setDisplay, curInv, setCurInv, invTotal, setInvTotal, cardName, setCardName, invNum, setinvNum, savedDisp, setSavedDisp, allDisp, setAllDisp, merchDisp, setMerchDisp, viewSaved, setViewSaved}
}

export {displayHooks}