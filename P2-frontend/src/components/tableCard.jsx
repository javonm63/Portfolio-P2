import '../styles/tableCard.css'

function TableCard({darkMode, tableWidth, tableID, invNumText, clientText, amountText, statusText, pageSubTitle, display}) {
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
                            <td className='row-data'>{item.item}</td>
                            <td className='row-data'>{item.descript}</td>
                            <td className='row-data'>{item.quantity}</td>
                            <td className='row-data'>{`$${item.price}`}</td>
                        </tr>
                    ))}
                        
                </tbody>
            </table>
        </article>
    )
}

export default TableCard