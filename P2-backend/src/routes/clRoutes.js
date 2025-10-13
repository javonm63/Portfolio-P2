import ClSignup from "../controllers/cl-signup.js"
import express from 'express'
import { validateClSignup, validateLogin } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import existingClUsr from "../middleware/existingClUser.js"
import clLogin from "../controllers/cl-login.js"
import authentUser from "../middleware/authenticateUser.js"
import { createPayIntent, deleteInvoice, loadClInvs } from "../controllers/cl-invoices.js"
import refreshToken from "../utils/refreshToken.js"



const Server = express()
// SIGN UP ROUTES 
Server.post('/signup', validateClSignup, validateHelper, existingClUsr, ClSignup)
Server.post('/login', validateLogin, validateHelper, clLogin)
Server.post('/refresh', refreshToken)
// INVOICES ROUTES
Server.get('/invoices', authentUser('client'), loadClInvs)
Server.delete('/invoices', authentUser('client'), deleteInvoice)
// PAY ROUTES 
Server.post('/pay', authentUser('client'), createPayIntent)

export default Server