const dotenv = require('dotenv')
const path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const environment = String(process.env.NODE_ENV).toLowerCase()
const envPath = path.join(__dirname, `./../../.env-${environment}`)

try {
    dotenv.config({
        path: envPath,
    })
} catch (error) {
    console.log(`${envPath} not found, load by environment variables`)
}

module.exports = {
    env: environment,
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.SECRET_TOKEN || 'FindMyZipCodePrivateToken',
        enabled: process.env.SECURITY_ENABLED ? process.env.SECURITY_ENABLED === 'true' : true,
    }
}
