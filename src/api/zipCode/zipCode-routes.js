const routes = require('express').Router()
const zipCodeController = require('./zipcode-controller')
const authorizationMiddleware = require('./../../middlewares/authorization').verifyToken

routes.get('/zipcode', authorizationMiddleware, (request, response) => {
    return zipCodeController.getZipCode(request, response)
})

routes.get('/zipcode/:zipcode', authorizationMiddleware, (request, response) => {
    return zipCodeController.getZipCode(request, response)
})

module.exports = routes