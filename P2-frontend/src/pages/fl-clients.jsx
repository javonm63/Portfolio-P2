import {navbarHooks} from "../hooks/fl-dashboardHooks.jsx";
import Searchbar from "../components/searchbar";
import WebNavbar from "../components/webNav.jsx";
import '../styles/fl-clients.css'
import NewClientInfo from "../components/newClientCard.jsx";
import TableCard2 from "../components/tableCard2.jsx";
import { showMoreHook, sendToHooks } from '../hooks/fi-invoicesHooks'
import MoreInfo from "../utils/moreInfo.jsx";
import { useEffect } from "react";
import { showDarkModeHook } from '../hooks/landingPageHooks.jsx'
import getCookie from "../utils/getCookie.jsx";
import { flAddClientHooks, showEditClientPopHooks } from "../hooks/fl-clientsHooks.jsx";


function FlClients() {
    const navbarHook = navbarHooks() 
    const showWebNav = navbarHook.showWebNav
    const setShowWebNav = navbarHook.setShowWebNav
    const sideNav = navbarHook.sideNav
    const setSideNav = navbarHook.setSideNav

    const moreInfo = showMoreHook()
    const setShowMore = moreInfo.setShowMoreInfo
    const showMore = moreInfo.showMoreInfo
    const showSendInfo = () => {
        setShowMore(true)
    }
    const darkModeHook = showDarkModeHook()
    const darkMode = darkModeHook.darkMode
    const setDarkMode = darkModeHook.setDarkMode

    const sendToHook = sendToHooks()
    const sendTo = sendToHook.sendTo
    const setSendTo = sendToHook.setSendTo

    const sendHook = flAddClientHooks()
    const send = sendHook.send
    const setSend = sendHook.setSend
    const dispClient = sendHook.dispClient
    const setDispClient = sendHook.setDispClient

    const showEditHooks = showEditClientPopHooks()
    const editPop = showEditHooks.showEditPop
    const setEditPop = showEditHooks.setShowEditPop

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme : dark)').matches) {
            setDarkMode(true)
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
        })
    })
    useEffect(() => {
        async function refresh() {
            const csrfToken = getCookie('csrfToken')
            const req = await fetch('http://localhost:6001/api/fl/refresh', {
                method: 'POST',
                headers: {"x-csrf-token": `Bearer ${csrfToken}`, 'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!req.ok) {
                const data = await req.json()
                console.log(data.message)
                if (data.message === 'Unauthorized user') {
                    window.location.href = '/'
                }
            }

            const dataReq = await fetch('http://localhost:6001/api/fl/clients', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })

            if (!dataReq.ok) {
                const data = await dataReq.json()
            } else {
                const data = await dataReq.json()
                if (data.data) {
                    const dataArr = []
                    const dataObj = data.data[0]
                    const database = dataObj.database
                    for (const value of Object.values(database)) {
                        const {name, email, phone, city} = value 
                        dataArr.push({name, email, phone, city})
                        setSendTo((prev) => [...prev, {name, email, phone, city}])
                    }
                    setDispClient(dataArr)
                }
            }
        }
        refresh()
    }, [])

    return ( 
        <div className="clients-page-container">
            <Searchbar sideNav={sideNav} setSideNav={setSideNav} setShowWebNav={setShowWebNav} />
            <header className="page-title-container">
                <h1 className={darkMode ? "page-titles" : "page-titles dark"}>CLIENTS</h1>
            </header>
            <WebNavbar showWebNav={showWebNav} />
            <h2 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"}>ADD NEW CLIENT</h2>
            <NewClientInfo setSendTo={setSendTo} setSend={setSend} setDisplay={setDispClient} send={send}/>
            <button className="addNewClient-button" onClick={() => {setSend(true)}}>Add Client</button>
            <h2 className={darkMode ? "page-sub-titles dark" : "page-sub-titles"}>YOUR CLIENTS</h2>
            <section className='clients-sub-page-container'>
                <MoreInfo showMore={showMore} setShowMore={setShowMore} MoreInfoTitle={'Clients page info.'} MoreInfoText={"On the clients page you can add new clients, remove clients and edit clients' information. To remove clients click their ID numbers, to edit a client's information click the client's name."} />
                <button className='inv-sub-page-text' type="button" onClick={showSendInfo}>See clients page info.</button>
                <TableCard2 showEditPop={editPop} setEditPopup={setEditPop} darkMode={darkMode} display={dispClient} tableWidth={'95%'} tableID={"add-client-table-body"} nameText={'CLIENT'} emailText={'EMAIL'} phoneText={'PHONE'} cityText={'CITY'} />
            </section>
        </div>
    )
}

export default FlClients