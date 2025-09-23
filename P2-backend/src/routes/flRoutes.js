import express from 'express'
import { validateSignup, validateLogin } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import existingUsr from "../middleware/existingUser.js"
import authentUser from "../middleware/authenticateUser.js"
import FlSignup from '../controllers/fl-signup.js'
import flLogin from '../controllers/fl-login.js'
import createInvoice from '../controllers/fl-invoices.js'
import { flValidateInvoice } from '../validators/flInvoiceValidator.js'
import { validateInvHelper } from '../utils/InvoiceValidation.js'


const Server = express()
// SIGN UP ROUTES 
Server.post('/signup', validateSignup, validateHelper, existingUsr, FlSignup)
Server.post('/login', validateLogin, validateHelper, flLogin)
// INVOICE API ROUTES 
Server.post('/invoices', flValidateInvoice, validateInvHelper, createInvoice)
// Server.get('/invoices')
// Server.patch('/invoices')
// Server.put('/invoices')
// Server.delete('/invoices')
// CLIENT API ROUTES 
// Server.post('/clients')
// Server.get('/clients')
// Server.patch('/clients')
// Server.put('/clients')
// Server.delete('/clients')

export default Server 