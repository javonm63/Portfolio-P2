import { showEditClientPopHooks } from '../hooks/fl-clientsHooks'
import '../styles/tableCard.css'
import EditedInfoCard from './editedInfoCard'
import SendPopup from './sendPopup'

function TableCard2({darkMode, tableWidth, tableID, nameText, emailText, phoneText, cityText, pageSubTitle, display, sendPop, setEditPopup, showEditPop}) {
    const editInfoHooks = showEditClientPopHooks()
    const clid = editInfoHooks.clid
    const setClid = editInfoHooks.setclid

    function editClientInfo(e) {
        setClid(e.target.value)
        setEditPopup(true)
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
                            <td className='row-data'><button className="table-button" type="button" value={item.email}>{item.city}</button></td>
                        </tr>
                    ))}
                         
                </tbody>
            </table>
            <SendPopup />
            <EditedInfoCard client={clid} showEditPop={showEditPop} setShowEditPop={setEditPopup}/>
        </article>
    )
}

export default TableCard2