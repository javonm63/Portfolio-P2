import express from 'express'
import { validateSignup, validateLogin } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import existingUsr from "../middleware/existingUser.js"
import authentUser from "../middleware/authenticateUser.js"
import FlSignup from '../controllers/fl-signup.js'
import flLogin from '../controllers/fl-login.js'
import { deleteClient, editClientInfo, flClients, sendClientData } from '../controllers/fl-clients.js'
import {createInvoice, deleteDraft, deleteInv, draftInv, generateInvoicePDF, getDrafts, saveReports, sendData, sendInv} from '../controllers/fl-invoices.js'
import { flValidateInvoice } from '../validators/flInvoiceValidator.js'
import { flValidateClient, flValidateEditClient } from '../validators/flclientsValidator.js'
import {flValidateReports } from '../validators/flreportsValidator.js'
import {flValidateProfileData } from '../validators/flsettingsValidator.js'
import { validateInvHelper } from '../utils/InvoiceValidation.js'
import { validateClntHelper } from '../utils/ClientValidation.js'
import refreshToken from '../utils/refreshToken.js'
import { editProfile, getAppSettings, makeProfile } from '../controllers/fl-settings.js'
import { flLogout } from '../controllers/fl-logout.js'
import { clearNotifs, getNotifs } from '../controllers/notifications.js'


const Server = express()
// SIGN/LOGIN AND LOGOUT UP API
Server.post('/signup', validateSignup, validateHelper, existingUsr, FlSignup)
Server.post('/login', validateLogin, validateHelper, flLogin)
Server.post('/refresh', refreshToken)
Server.get('/logout', authentUser('freelancer'), flLogout)
// INVOICE API 
Server.post('/invoices', authentUser('freelancer'), flValidateInvoice, validateInvHelper, createInvoice)
Server.get('/invoices', authentUser('freelancer'), sendData)
Server.delete('/invoices', authentUser('freelancer'), deleteInv)
// VIEW/EMAIL INVOICE API
Server.get('/view', authentUser('freelancer'), sendInv)
Server.post('/:id/pdf', generateInvoicePDF)
// REPORTS API 
Server.post('/reports', authentUser('freelancer'), flValidateReports, validateHelper, saveReports)
Server.get('/reports', authentUser('freelancer'), saveReports)
// DRAFT INVOICE API 
Server.get('/draft', authentUser('freelancer'), getDrafts)
Server.delete('/draft', authentUser('freelancer'), deleteDraft)
Server.post('/draft', authentUser('freelancer'), flValidateInvoice, validateInvHelper, draftInv)
// CLIENT API 
Server.post('/clients', authentUser('freelancer'), flValidateClient, validateClntHelper, flClients)
Server.get('/clients', authentUser('freelancer'), sendClientData)
Server.patch('/clients', authentUser('freelancer'), flValidateEditClient, validateClntHelper, editClientInfo)
Server.delete('/clients', authentUser('freelancer'), deleteClient)
// NOTIFACTIONS API 
Server.get('/notifications', authentUser('freelancer'), getNotifs)
Server.delete('/notifications', authentUser('freelancer'), clearNotifs)
// SETTINGS API 
Server.get('/settings', authentUser('freelancer'), getAppSettings)
Server.post('/settings', authentUser('freelancer'), flValidateProfileData, validateHelper, makeProfile)
Server.patch('/settings', authentUser('freelancer'), editProfile)
// Server.delete()

export default Server 