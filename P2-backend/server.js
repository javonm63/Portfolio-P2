import https from 'https'
import fs from 'fs'
import app from './src/app.js'
// GLOBAL VRIABLES
const port = process.env.PORT || 6000
const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
}
// HTTPS SERVER  
const server = https.createServer(options, app)
server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
