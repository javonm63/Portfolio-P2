import { validationResult } from "express-validator";

export function validateHelper(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    if (req.body.pass !== req.body.conPass) {
        return res.status(400).json({errors: [{path: 'conPass'}]})
    }
    next()
}