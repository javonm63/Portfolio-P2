import http from 'http'
import fs from 'fs'
import App from './src/app.js'
// GLOBAL VRIABLES
const port = process.env.PORT || 6000
const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
}
// HTTPS SERVER  
const server = http.createServer(options, App)
server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
 