import '../styles/tableCard.css'
import SendPopup from './sendPopup'
import { sendInvHook } from '../hooks/fi-invoicesHooks'
import { showAlertHooks } from '../hooks/fl-apiHooks'
import MoreInfo from '../utils/moreInfo'
import { showDarkModeHook } from '../hooks/landingPageHooks'

function TableCard({setDispNotif, deleteAll, view, setCurInv, setShowNew, setShowDraft, setDraft, setLoad, setViewInvData, clientDisp, setView, dispItem, setDispItem, darkMode, tableWidth, tableID, invNumText, clientText, amountText, statusText, pageSubTitle, display, display2, display3, display4, display5, setDisplay4, setInv, Inv, sendTo}) {
    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert
    const alertText = alertHooks.alertText
    const setAlertText = alertHooks.setAlertText

    const currInvId = []
    const currInv = []
    const sendPopHook = sendInvHook()
    const sendPop = sendPopHook.sendPopup
    const setSendPop = sendPopHook.setSendPopup

    function startSend(item) {
        if (setInv) {
            setInv(String(item.invId))
            setSendPop(true)
        } else {
            setCurInv([item.invId, item.total])
            clientDisp(true)
        }
    } 

    async function viewInvoice(e) {
        if (view) {
            if (currInvId.length > 0) {
                currInvId.pop()
                currInvId.push(e.target.value)
            } else {
                currInvId.push(e.target.value)
            }
            try { 
                const fetchSaved = await fetch('http://localhost:6001/api/cl/invoices', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                })
                if (!fetchSaved.ok) {
                    const error = await fetchSaved.json()
                    console.log(error)
                } else {
                    const data = await fetchSaved.json()
                    const database = data.paid
                    for (const [key, value] of Object.entries(database)) {
                        if (key === currInvId[0]) {
                            if (currInv.length > 0) {
                                currInv.pop()
                                currInv.push(value)
                                setViewInvData(currInv)
                            } else {
                                currInv.push(value)
                                setViewInvData(currInv)
                            }
                        }
                    }
                    setView(true)
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            if (currInvId.length > 0) {
                currInvId.pop()
                currInvId.push(e.target.value)
            } else {
                currInvId.push(e.target.value)
            }
            
            const req = await fetch('http://localhost:6001/api/fl/view', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
            if (!req.ok) {
                const data = await req.json()
                console.log(data)
            } else {
                const data = await req.json()
                const database = data.data
                for (const [key, value] of Object.entries(database)) {
                    if (key === currInvId[0]) {
                        if (currInv.length > 0) {
                            currInv.pop()
                            currInv.push(value)
                            setViewInvData(currInv)
                        } else {
                            currInv.push(value)
                            setViewInvData(currInv)
                        }
                    }
                }
            }
            setView(true)
        }
    }

    async function printInvoice() {

    } 

    async function deleteInvoice(e) {
        if (deleteAll) {
            if (currInvId.length > 0) {
                currInvId.pop()
                currInvId.push(e.target.value)
            } else {
                currInvId.push(e.target.value)
            }
            try {
                const req = await fetch('http://localhost:6001/api/cl/invoices', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data: currInvId[0]}),
                credentials: 'include'
                })
                if (!req.ok) {
                    const error = await req.json()
                    console.log(error)
                } else {
                    const data = await req.json()
                    const message = data.message
                    if (message === 'invoice deleted') {
                        setShowAlert(true)
                        setAlertText('Invoice deleted refresh the page to see changes')
                    }
                    console.log(message)
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            if (currInvId.length > 0) {
                currInvId.pop()
                currInvId.push(e.target.value)
            } else {
                currInvId.push(e.target.value)
            }
            try {
                const req = await fetch('http://localhost:6001/api/fl/invoices', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data: currInvId[0]}),
                credentials: 'include'
                })
                if (!req.ok) {
                    const error = await req.json()
                    console.log(error)
                } else {
                    const data = await req.json()
                    const message = data.message
                    if (message === 'invoice deleted') {
                        setShowAlert(true)
                        setAlertText('Invoice deleted refresh the page to see changes')
                    }
                    console.log(message)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function loadDraft(e) {
        const invId = e.target.value
        try {
            const fetchDrafts = await fetch('http://localhost:6001/api/fl/draft', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
            if (!fetchDrafts.ok) {
                const error = await fetchDrafts.json()
                console.log(error)
            } else {
                const data = await fetchDrafts.json()
                const database = data.data.Draft
                for (const [key, value] of Object.entries(database)) {
                    if (key === invId) {
                        setLoad(value)
                        setDraft(true)
                        setShowNew(true)
                        setShowDraft(false)
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function deleteDraft(e) {
        const invId = e.target.value 
        try {
            const req = await fetch('http://localhost:6001/api/fl/draft', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({invId}), 
                credentials: 'include'
            })
            if (!req.ok) {
                const error = await req.json()
                console.log(error)
            } else {
                const data = await req.json()
                if (data.message === 'draft deleted') {
                    const curIndex = display4.findIndex((draft) => draft.invId === invId)
                    display4.splice(curIndex, 1)
                    setShowAlert(true)
                    setAlertText('Draft deleted successfully.')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <article className='tableCard-container' style={{width: tableWidth}}>
            <table className='table-container'>
                <thead className={darkMode ? 'page-sub-titles2 dark' : 'page-sub-titles2'}>
                    <tr>
                        <th>{pageSubTitle}</th>
                    </tr>
                </thead>
                <tbody id={tableID} className='tbody'>
                    <tr className='table-titles-cont'>
                        <th className='table-titles'>{invNumText}</th>
                        <th className='table-titles'>{clientText}</th>
                        <th className='table-titles'>{amountText}</th>
                        <th className='table-titles'>{statusText}</th>
                    </tr>
                    {display && display.map((item, i) => (
                        <tr className='table-row' key={i}>
                            <td className='row-data'>{item.item || `#${item.invId}`}</td>
                            <td className='row-data-descript'>{item.descript || item.name}</td>
                            <td className='row-data'>{item.quantity || `$${item.total}`}</td>
                            <td className='row-data'><button className="table-button" type="button" onClick={() => startSend(item)}>{item.stat || `$${item.price}`}</button></td>
                        </tr>
                    ))}
                    {display2 && display2.map((item, i) => (
                        <tr className='table-row' key={i}>
                            <td className='row-data'><button className='all-inv-table-buttons' type='button' value={item.invId} onClick={viewInvoice}>{`#${item.invId}`}</button></td>
                            <td className='row-data'><button className='all-inv-table-buttons' type='button' value={item.invId} onClick={printInvoice}>{item.name}</button></td>
                            <td className='row-data'>{`$${item.total}`}</td>
                            <td className='row-data'><button className='all-inv-table-buttons' type='button' value={item.invId} onClick={deleteInvoice}>{item.stat}</button></td>
                        </tr>
                    ))}
                    {display3 && display3.map((item, i) => (
                        <tr className='table-row' key={i}>
                            <td className='row-data'>{item.item}</td>
                            <td className='row-data'>{item.descript}</td>
                            <td className='row-data'>{item.quantity}</td>
                            <td className='row-data'>{`$${item.price}` || ''}</td>
                        </tr>
                    ))}
                    {display4 && display4.map((item, i) => (
                        <tr className='table-row' key={i}>
                            <td className='row-data'><button className='all-inv-table-buttons' type='button' value={item.invId} onClick={loadDraft}>{`#${item.invId}`}</button></td>
                            <td className='row-data'>{item.name}</td>
                            <td className='row-data'>{item.total}</td>
                            <td className='row-data'><button className='all-inv-table-buttons' type='button' value={item.invId} onClick={deleteDraft}>{item.stat}</button></td>
                        </tr>
                    ))}
                    {display5 && display5.map((item, i) => (
                        <tr className='table-row' key={i}>
                            <td className='row-data'>{item.name}</td>
                            <td className='row-data'>{item.email}</td>
                            <td className='row-data'>{item.phone}</td>
                            <td className='row-data'>{item.company}</td>
                        </tr>
                    ))}
                        
                </tbody>
            </table>
            <SendPopup setDispNotif={setDispNotif} dispItem={dispItem} setDispItem={setDispItem} inv={Inv} display={sendPop} setDisplay={setSendPop} sendTo={sendTo} />
            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={alertText} />
        </article>
    )
}

export default TableCard