import '../styles/invoiceSettingsCard.css'

function InvoiceSetCard({on, toggleDarkMode}) {
    const logout = async () => {
        const req = await fetch('http://localhost:6001/api/fl/logout', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        if (!req.ok) {
            const error = await req.json()
            console.log(error)
        } else {
            const data = await req.json()
            console.log(data)
            sessionStorage.removeItem('role')
            window.location.href = '/'
        }
    } 
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
            <p className='invSettingsCurrTitle'>DarkMode</p>
            <label className="switch">
                <input type="checkbox" id="toggle" checked={on} onChange={toggleDarkMode}></input>
                <span className="slider"></span>
            </label>
            <button className='web-logout-btn' type='button' onClick={logout}>LOGOUT</button>
        </section>
    )
}

export default InvoiceSetCard