import '../styles/tableCard.css'

function TableCard({darkMode, tableWidth, tableID, invNumText, clientText, amountText, statusText, pageSubTitle}) {
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
                    <tr className='table-row'>
                        <td className='row-data'>#1287</td>
                        <td className='row-data'>John Doe</td>
                        <td className='row-data'>$59.44</td>
                        <td className='row-data'>Paid</td>
                    </tr>
                </tbody>
            </table>
        </article>
    )
}

export default TableCard