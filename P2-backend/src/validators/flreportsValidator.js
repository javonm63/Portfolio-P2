import { body } from 'express-validator'

export const flValidateReports = [
    body('earned').optional().isNumeric().trim(),
    body('unpaid').optional().isNumeric().trim(),
    body('overdue').optional().isNumeric().trim(),
    body('paidReport').optional().isString().trim()
]