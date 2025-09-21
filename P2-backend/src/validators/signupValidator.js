import { body } from 'express-validator'

export const validateSignup = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('company').isString().notEmpty().withMessage('company is required'),
    body('email').isEmail().withMessage('enter valid email'),
    body('phone').isLength({max: 10}).withMessage('enter valid phone'),
    body('pass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long'),
    body('conPass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long'),
]

export const validateLogin = [
    body('email').isEmail().withMessage('enter valid email'),
    body('pass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long'),
]