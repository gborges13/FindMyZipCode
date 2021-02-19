const express = require('express')
const routes = require('./api/zipCode/zipCode-routes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

