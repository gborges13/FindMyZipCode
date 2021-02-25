const routes = require('express').Router()
const zipCodeController = require('./zipcode-controller')
const authorizationMiddleware = require('./../../middlewares/authorization').verifyToken
const { body, param } = require('express-validator');

routes.get('/zipcode/:zipcode', 
           authorizationMiddleware, 
           param('zipcode').isString().isLength({min: 8, max: 8}),
           async (request, response) => {
    return await zipCodeController.getZipCode(request, response)
})

routes.delete('/zipcode/:zipcode', 
              authorizationMiddleware, 
              param('zipcode').isString().isLength({min: 8, max: 8}),
              (request, response) => {
    return zipCodeController.deleteZipCode(request, response)
})

routes.post('/zipcode',            
           authorizationMiddleware, 
           body('zipCode').isString().isLength({min: 8, max: 8}),
           body('address').isString(),
           body('district').isString(),
           body('city').isString(),
           body('state').isString().isLength({min: 2, max: 2}),
           (request, response) => {   
    return zipCodeController.postZipCode(request, response)
})

module.exports = routes