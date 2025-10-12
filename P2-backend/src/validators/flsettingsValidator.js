import { body } from 'express-validator'

export const flValidateProfileData = [
    body('editName').optional().isString().notEmpty().trim(),
    body('editEmail').optional().isString().notEmpty().trim(),
    body('editPhone').optional().isString().notEmpty().trim(),
    body('editPass').optional().isString().notEmpty().trim(),
    body('comp').optional().isString().trim(),
    body('street').optional().isString().notEmpty().trim(),
    body('city').optional().isString().notEmpty().trim(),
    body('state').optional().isString().notEmpty().trim(),
    body('zip').optional().isString().notEmpty().trim(),
    body('cardNumber').optional().isNumeric().notEmpty().trim(),
    body('expiration').optional().isDate().notEmpty().trim(),
    body('cvc').optional().isNumeric().notEmpty().trim(),
    body('comp2').optional().isString().notEmpty().trim()
]