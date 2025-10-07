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


const Server = express()
// SIGN UP ROUTES 
Server.post('/signup', validateSignup, validateHelper, existingUsr, FlSignup)
Server.post('/login', validateLogin, validateHelper, flLogin)
Server.post('/refresh', refreshToken)
// INVOICE API ROUTES 
Server.post('/invoices', authentUser('freelancer'), flValidateInvoice, validateInvHelper, createInvoice)
Server.get('/invoices', authentUser('freelancer'), sendData)
Server.delete('/invoices', authentUser('freelancer'), deleteInv)
// VIEW INVOICE API ROUTE 
Server.get('/view', authentUser('freelancer'), sendInv)
// REPORTS API ROUTE 
Server.post('/reports', authentUser('freelancer'), saveReports)
Server.get('/reports', authentUser('freelancer'), saveReports)
// DRAFT INVOICE API ROUTES
Server.get('/draft', authentUser('freelancer'), getDrafts)
Server.delete('/draft', authentUser('freelancer'), deleteDraft)
Server.post('/draft', authentUser('freelancer'), flValidateInvoice, validateInvHelper, draftInv)
// CLIENT API ROUTES 
Server.post('/clients', authentUser('freelancer'), flValidateClient, validateClntHelper, flClients)
Server.get('/clients', authentUser('freelancer'), sendClientData)
Server.patch('/clients', authentUser('freelancer'), flValidateEditClient, validateClntHelper, editClientInfo)
// Server.put('/clients')
Server.delete('/clients', authentUser('freelancer'), deleteClient)

export default Server 