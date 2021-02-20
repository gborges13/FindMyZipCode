const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json');
const routes = require('./api/zipCode/zipCode-routes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

