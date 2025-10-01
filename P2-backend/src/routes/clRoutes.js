import ClSignup from "../controllers/cl-signup.js"
import express from 'express'
import { validateClSignup, validateLogin } from '../validators/signupValidator.js'
import { validateHelper } from '../utils/signupValidatorHelper.js'
import existingClUsr from "../middleware/existingClUser.js"



const Server = express()
// SIGN UP ROUTES 
Server.post('/signup', validateClSignup, validateHelper, existingClUsr, ClSignup)

export default Server