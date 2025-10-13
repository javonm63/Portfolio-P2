import ClSignup from "../controllers/cl-signup.js"
import express from 'express'
import { validateClSignup, validateLogin } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import {flValidateProfileData } from '../validators/flsettingsValidator.js'
import existingClUsr from "../middleware/existingClUser.js"
import clLogin from "../controllers/cl-login.js"
import authentUser from "../middleware/authenticateUser.js"
import { createPayIntent, deleteInvoice, loadClInvs, saveReports2 } from "../controllers/cl-invoices.js"
import refreshToken from "../utils/refreshToken.js"
import { editClProfile, getClAppSettings, makeClProfile } from '../controllers/cl-settings.js'
import { clLogout } from "../controllers/cl-logout.js"



const Server = express()
// SIGN UP/ LOGIN/ LOGOUT API
Server.post('/signup', validateClSignup, validateHelper, existingClUsr, ClSignup)
Server.post('/login', validateLogin, validateHelper, clLogin)
Server.post('/refresh', refreshToken)
Server.get('/logout', authentUser('client'), clLogout)
// INVOICES API
Server.get('/invoices', authentUser('client'), loadClInvs)
Server.delete('/invoices', authentUser('client'), deleteInvoice)
// PAY INVOICE API
Server.post('/pay', authentUser('client'), createPayIntent)
// REPORTS API
Server.post('/reports', authentUser('client'), saveReports2)
// SETTINGS API 
Server.get('/settings', authentUser('client'), getClAppSettings)
Server.post('/settings', authentUser('client'), flValidateProfileData, validateHelper, makeClProfile)
Server.patch('/settings', authentUser('client'), editClProfile)
// Server.delete()

export default Server