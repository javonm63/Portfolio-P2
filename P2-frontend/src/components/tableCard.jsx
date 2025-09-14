import '../styles/tableCard.css'

function TableCard({tableID, statusText, pageSubTitle}) {
    return (
        <div className='tableCard-container'>
            <table className='table-container'>
                <thead className='page-sub-titles'>
                    <tr>
                        <th>{pageSubTitle}</th>
                    </tr>
                </thead>
                <tbody id={tableID} className='tbody'>
                    <tr className='table-titles-cont'>
                        <th className='table-titles'>INVOICE</th>
                        <th className='table-titles'>CLIENT</th>
                        <th className='table-titles'>AMOUNT</th>
                        <th className='table-titles'>{statusText}</th>
                    </tr>
                    <tr className='table-row'>
                        <td className='row-data'>#1287</td>
                        <td className='row-data'>John Doe</td>
                        <td className='row-data'>$59.44</td>
                        <td className='row-data'>Paid</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableCard