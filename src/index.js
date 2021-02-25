require('newrelic')
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json');
const zipCodeRoutes = require('./api/zipCode/zipCode-routes')
const healthRoutes = require('./api/health/health-routes')
const logger = require('./middlewares/logs').logRequests
const config = require('config')

const app = express()
const port = config.port

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use(logger)
app.use(zipCodeRoutes)
app.use(healthRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

