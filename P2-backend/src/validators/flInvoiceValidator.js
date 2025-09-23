import { body } from 'express-validator'

export const flValidateInvoice = [
    body('name').optional().isString().notEmpty().withMessage('name is required').trim(),
    body('date').optional().isDate().notEmpty().withMessage("Enter today's date").trim(),
    body('due').optional().isDate().notEmpty().withMessage('due date is required').trim(),
    body('id').optional().isString().trim(),
    body('notes').optional().isString().trim(),
    body('fees').optional().isNumeric().trim(),
    body('coupons').optional().isString().trim(),
    body('discounts').optional().isNumeric().trim(),
    body('item').optional().isString().notEmpty().withMessage('item name is required').trim(),
    body('quantity').optional().isNumeric().notEmpty().withMessage("Enter item quantity").trim(),
    body('descript').optional().isString().notEmpty().withMessage('item description is required').trim(),
    body('price').optional().isNumeric().notEmpty().withMessage('item price is required').trim()
]
