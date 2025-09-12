import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
// import clRoutes from './routes/clRoutes.js'
// import flRoutes from './routes/flRoutes.js'
import logger from './utils/logger.js'

const app = express()

// GLOBAL MIDDLEWARES
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: 'https://localhost:5173'}))
app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim())}
}))
// app.use('/api/fl', flRoutes)
// app.use('/api/cl', clRoutes)
app.use((err, req, res, next) => {
    logger.error('Server Error', {error: err.stack})
    res.status(500).json({message: 'Server Error', error: err.message})
})

export default app