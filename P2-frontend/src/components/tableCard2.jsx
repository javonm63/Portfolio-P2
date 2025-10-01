import '../styles/tableCard.css'
import SendPopup from './sendPopup'

function TableCard2({darkMode, tableWidth, tableID, nameText, emailText, phoneText, cityText, pageSubTitle, display, sendPop}) {
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
                            <td className='row-data'><button className="table-button" type="button">{item.name}</button></td>
                            <td className='row-data-email'>{item.email}</td>
                            <td className='row-data'>{item.phone}</td>
                            <td className='row-data'>{item.city}</td>
                        </tr>
                    ))}
                         
                </tbody>
            </table>
            <SendPopup />
        </article>
    )
}

export default TableCard2