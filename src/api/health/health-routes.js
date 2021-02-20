const routes = require('express').Router()
const healthController = require('./health-controller')

routes.get('/ping', (request, response) => {
    return healthController.pong(request, response)
})

module.exports = routes