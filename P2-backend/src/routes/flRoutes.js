import express from 'express'
import { validateSignup } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import FlSignup from '../controllers/fl-signup.js'


const Server = express()
// SIGN UP ROUTES 
Server.post('/signup', validateSignup, validateHelper, FlSignup)
// INVOICE API ROUTES 
// Server.post('/invoices')
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