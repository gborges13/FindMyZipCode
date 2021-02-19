const routes = require('express').Router()

routes.get('/zipcode', (request, response) => {
    console.log(request.body)
    return response.json({message : ''})
})

routes.get('/zipcode/:zipcode', (request, response) => {
    return response.json({message : ''})
})


module.exports = routes