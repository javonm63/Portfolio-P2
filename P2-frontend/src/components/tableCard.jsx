import '../styles/tableCard.css'
import SendPopup from './sendPopup'
import { sendInvHook } from '../hooks/fi-invoicesHooks'
import { showAlertHooks } from '../hooks/fl-apiHooks'
import MoreInfo from '../utils/moreInfo'

function TableCard({setViewInvData, setView, dispItem, setDispItem, darkMode, tableWidth, tableID, invNumText, clientText, amountText, statusText, pageSubTitle, display, display2, display3, setInv, Inv, sendTo}) {
    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert

    const currInvId = []
    const currInv = []
    const sendPopHook = sendInvHook()
    const sendPop = sendPopHook.sendPopup
    const setSendPop = sendPopHook.setSendPopup

    function startSend(item) {
        setInv(String(item.invId))
        setSendPop(true)
        console.log(Inv)
    } 

    async function viewInvoice(e) {
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

    async function deleteInvoice(e) {
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
                }
                console.log(message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <article className='tableCard-container' style={{width: tableWidth}}>
            <table className='table-container'>
                <thead className= {darkMode ? 'page-sub-titles dark' : 'page-sub-titles'}>
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
                            <td className='row-data'><button className='all-inv-table-buttons' type='button'>{item.name}</button></td>
                            <td className='row-data'>{`$${item.total}`}</td>
                            <td className='row-data'><button className='all-inv-table-buttons' type='button' value={item.invId} onClick={deleteInvoice}>{item.stat}</button></td>
                        </tr>
                    ))}
                    {display3 && display3.map((item, i) => (
                        <tr className='table-row' key={i}>
                            <td className='row-data'>{item.item}</td>
                            <td className='row-data'>{item.descript}</td>
                            <td className='row-data'>{item.quantity}</td>
                            <td className='row-data'>{`$${item.price}`}</td>
                        </tr>
                    ))}
                        
                </tbody>
            </table>
            <SendPopup dispItem={dispItem} setDispItem={setDispItem} inv={Inv} display={sendPop} setDisplay={setSendPop} sendTo={sendTo} />
            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={'Invoice deleted refresh the page to see changes'} />
        </article>
    )
}

export default TableCard