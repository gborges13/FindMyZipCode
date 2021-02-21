const zipCodeService = require('./zipcode-service')
const { validationResult } = require('express-validator');

function getZipCode(request, response){

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }            

    let {zipCode} = request.body
    if (!zipCode){
        zipCode = request.params.zipcode
    }

    const record = zipCodeService.findZipCode(zipCode)
    if(record){
        return response.json(record)
    } else {
        return response.status(404).json({message : "CEP inválido!"})
    }        
}

module.exports = {
    getZipCode
}