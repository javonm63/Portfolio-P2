import { body } from 'express-validator'

export const flValidateClient = [
    body('name').isString().notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().notEmpty().withMessage("Enter a valid email").trim(),
    body('phone').isNumeric().isLength({min: 10, max: 10}).withMessage('Enter a valid phone').notEmpty().withMessage('Enter a valid phone number').trim(),
    body('city').isString().notEmpty().withMessage('City is required').trim(),
]

export const flValidateEditClient = [
    body('name').optional({values: 'falsy'}).isString().trim(),
    body('email').optional({values: 'falsy'}).isEmail().trim(),
    body('phone').optional({values: 'falsy'}).isNumeric().isLength({min: 10, max: 10}).withMessage('Enter a valid phone').trim(),
    body('city').optional().isString().trim(),
]