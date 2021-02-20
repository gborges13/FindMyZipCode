const routes = require('express').Router()
const zipCodeService = require('./zipcode-service')
const authorizationMiddleware = require('./../../middlewares/authorization').verifyToken

routes.get('/zipcode', authorizationMiddleware, (request, response) => {
    let {zipCode} = request.body

    const record = zipCodeService.findZipCode(zipCode)
    if(record){
        return response.json(record)
    } else {
        return response.status(404).json({message : "CEP inválido!"})
    }    
})

routes.get('/zipcode/:zipcode', authorizationMiddleware, (request, response) => {
    let zipCode = request.params.zipcode

    const record = zipCodeService.findZipCode(zipCode)
    if(record){
        return response.json(record)
    } else {
        return response.status(404).json({message : "CEP inválido!"})
    }    
})

module.exports = routes