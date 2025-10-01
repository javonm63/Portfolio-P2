import express from 'express'
import { validateSignup, validateLogin } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import existingUsr from "../middleware/existingUser.js"
import authentUser from "../middleware/authenticateUser.js"
import FlSignup from '../controllers/fl-signup.js'
import flLogin from '../controllers/fl-login.js'
import { flClients, sendClientData } from '../controllers/fl-clients.js'
import {createInvoice, sendData, sendInv} from '../controllers/fl-invoices.js'
import { flValidateInvoice } from '../validators/flInvoiceValidator.js'
import { flValidateClient } from '../validators/flclientsValidator.js'
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
// Server.patch('/invoices')
// Server.put('/invoices')
// Server.delete('/invoices')
Server.get('/view', authentUser('freelancer'), sendInv)
// CLIENT API ROUTES 
Server.post('/clients', authentUser('freelancer'), flValidateClient, validateClntHelper, flClients)
Server.get('/clients', authentUser('freelancer'), sendClientData)
// Server.patch('/clients')
// Server.put('/clients')
// Server.delete('/clients')

export default Server 