import { body } from 'express-validator'

export const validateSignup = [
    body('name').isString().notEmpty().withMessage('name is required').trim(),
    body('company').optional().isString().notEmpty().withMessage('company is required').trim(),
    body('email').isEmail().withMessage('enter valid email').trim(),
    body('phone').isLength({max: 10}).withMessage('enter valid phone').trim(),
    body('pass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long').trim(),
    body('conPass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long').trim(),
]

export const validateClSignup = [
    body('name').isString().notEmpty().withMessage('name is required').trim(),
    body('email').isEmail().withMessage('enter valid email').trim(),
    body('phone').isLength({max: 10}).withMessage('enter valid phone').trim(),
    body('pass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long').trim(),
    body('conPass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long').trim(),
]

export const validateLogin = [
    body('email').isEmail().withMessage('enter valid email').trim(),
    body('pass').isString().isLength({min: 6}).notEmpty().withMessage('password must be at least 6 characters long').trim(),
]