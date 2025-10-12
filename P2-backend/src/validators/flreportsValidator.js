import { body } from 'express-validator'

export const flValidateReports = [
    body('earned').optional().isString().trim(),
    body('unpaid').optional().isString().trim(),
    body('overdue').optional().isString().trim(),
    body('paidReport').optional().isString().trim()
]