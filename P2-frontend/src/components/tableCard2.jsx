import { showAlertHooks, showEditClientPopHooks } from '../hooks/fl-clientsHooks'
import '../styles/tableCard.css'
import MoreInfo from '../utils/moreInfo'
import EditedInfoCard from './editedInfoCard'
import SendPopup from './sendPopup'

function TableCard2({darkMode, tableWidth, tableID, nameText, emailText, phoneText, cityText, pageSubTitle, display, sendPop, setEditPopup, showEditPop}) {
    const editInfoHooks = showEditClientPopHooks()
    const clid = editInfoHooks.clid
    const setClid = editInfoHooks.setclid

    const alertHooks = showAlertHooks()
    const showAlert = alertHooks.showAlert
    const setShowAlert = alertHooks.setShowAlert
    const setAlertText = alertHooks.setAlertText
    const alertText = alertHooks.alertText

    function editClientInfo(e) {
        setClid(e.target.value)
        setEditPopup(true)
    }

    async function deleteClient(ev){
        const clid = ev.target.value
        console.log(clid)
        try {
            const req = await fetch('http://localhost:6001/api/fl/clients', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({clid}),
                credentials: 'include'
            })
            if (!req.ok) {
                const error = await req.json()
                console.log(error)
            } else {
                const data = await req.json()
                if (data.message === 'client deleted') {
                    setShowAlert(true)
                    setAlertText('Client deleted successfully, refresh page to see changes.')
                }
                console.log(data)
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
                        <th className='table-titles'>{nameText}</th>
                        <th className='table-titles'>{emailText}</th>
                        <th className='table-titles'>{phoneText}</th>
                        <th className='table-titles'>{cityText}</th>
                    </tr>
                    {display && display.map((item, i) => (
                        <tr className='table-row' key={i}>
                            <td className='row-data'><button className="table-button" type="button" value={item.email} onClick={editClientInfo}>{item.name}</button></td>
                            <td className='row-data-email'>{item.email}</td>
                            <td className='row-data'>{item.phone}</td>
                            <td className='row-data'><button className="table-button" type="button" value={item.email} onClick={deleteClient}>{item.city}</button></td>
                        </tr>
                    ))}
                         
                </tbody>
            </table>
            <SendPopup />
            <EditedInfoCard client={clid} showEditPop={showEditPop} setShowEditPop={setEditPopup}/>
            <MoreInfo showMore={showAlert} setShowMore={setShowAlert} MoreInfoTitle={'ALERT'} MoreInfoText={alertText} />
        </article>
    )
}

export default TableCard2