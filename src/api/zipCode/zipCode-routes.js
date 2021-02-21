const routes = require('express').Router()
const zipCodeController = require('./zipcode-controller')
const authorizationMiddleware = require('./../../middlewares/authorization').verifyToken
const { body } = require('express-validator');

routes.get('/zipcode',            
           authorizationMiddleware, 
           body('zipCode').isString().isLength({min: 8, max: 8}),
           (request, response) => {   
    return zipCodeController.getZipCode(request, response)
})

routes.get('/zipcode/:zipcode', authorizationMiddleware, (request, response) => {
    return zipCodeController.getZipCode(request, response)
})

module.exports = routes