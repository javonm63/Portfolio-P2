import '../styles/invoiceSettingsCard.css'

function InvoiceSetCard() {
    return (
        <section className='invSettings-page-container'>
            <p className='invSettingsCurrTitle'>Default Currency:</p>
            <select className='invSettingsCurrDropDn'>
                <option className='invSettingsDropDnOptions' defaultValue={'USD'}>USD</option>
                <option className='invSettingsDropDnOptions' value="CAD">CAD</option>
                <option className='invSettingsDropDnOptions' value="GBP">GBP</option>
                <option className='invSettingsDropDnOptions' value="EUR">EUR</option>
            </select>
            <p className='invSettingsCurrTitle'>Tax Rate:</p>
            <select className='invSettingsCurrDropDn'>
                <option className='invSettingsDropDnOptions' value="3%">3%</option>
                <option className='invSettingsDropDnOptions' value="5%">5%</option>
                <option className='invSettingsDropDnOptions' value="10%">10%</option>
                <option className='invSettingsDropDnOptions' value="12%">12%</option>
                <option className='invSettingsDropDnOptions' value="15%">15%</option>
                <option className='invSettingsDropDnOptions' value="18%">18%</option>
                <option className='invSettingsDropDnOptions' value="20%">20%</option>
                <option className='invSettingsDropDnOptions' value="25%">25%</option>
            </select>
        </section>
    )
}

export default InvoiceSetCard