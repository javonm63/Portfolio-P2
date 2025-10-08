import express from 'express'
import { validateSignup, validateLogin } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import existingUsr from "../middleware/existingUser.js"
import authentUser from "../middleware/authenticateUser.js"
import FlSignup from '../controllers/fl-signup.js'
import flLogin from '../controllers/fl-login.js'
import { deleteClient, editClientInfo, flClients, sendClientData } from '../controllers/fl-clients.js'
import {createInvoice, deleteDraft, deleteInv, draftInv, getDrafts, saveReports, sendData, sendInv} from '../controllers/fl-invoices.js'
import { flValidateInvoice } from '../validators/flInvoiceValidator.js'
import { flValidateClient, flValidateEditClient } from '../validators/flclientsValidator.js'
import { validateInvHelper } from '../utils/InvoiceValidation.js'
import { validateClntHelper } from '../utils/ClientValidation.js'
import refreshToken from '../utils/refreshToken.js'
import { editProfile, getAppSettings, makeProfile } from '../controllers/fl-settings.js'


const Server = express()
// SIGN UP API
Server.post('/signup', validateSignup, validateHelper, existingUsr, FlSignup)
Server.post('/login', validateLogin, validateHelper, flLogin)
Server.post('/refresh', refreshToken)
// INVOICE API 
Server.post('/invoices', authentUser('freelancer'), flValidateInvoice, validateInvHelper, createInvoice)
Server.get('/invoices', authentUser('freelancer'), sendData)
Server.delete('/invoices', authentUser('freelancer'), deleteInv)
// VIEW INVOICE API
Server.get('/view', authentUser('freelancer'), sendInv)
// REPORTS API 
Server.post('/reports', authentUser('freelancer'), saveReports)
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
// SETTINGS API 
Server.get('/settings', authentUser('freelancer'), getAppSettings)
Server.post('/settings', authentUser('freelancer'), makeProfile)
Server.patch('/settings', authentUser('freelancer'), editProfile)
// Server.delete()


export default Server 