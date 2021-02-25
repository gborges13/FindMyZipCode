const zipCodeService = require('./zipcode-service')
const { validationResult } = require('express-validator');

async function getZipCode(request, response){
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }            

        zipCode = request.params.zipcode

        const record = await zipCodeService.findZipCode(zipCode)
        if(record){
            return response.json(record)
        } else {
            return response.status(404).json({message : "CEP inválido!"})
        }        
    } catch (error) {
        return response.status(500).json({error: error.message, callstack : error.stack})
    }
}

function postZipCode(request, response){
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }            
    
        return response.status(201).json(zipCodeService.saveZipCode(request.body))

    } catch (error) {
        return response.status(500).json({error: error.message, callstack : error.stack})
    }
}

function deleteZipCode(request, response){
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }            
        
        zipCode = request.params.zipcode

        const result = zipCodeService.deleteZipCode(zipCode)
        if (result){
            return response.status(204).send()
        } else {
            return response.status(404).json({message : "CEP inválido!"})
        }

    } catch (error) {
        return response.status(500).json({error: error.message, callstack : error.stack})
    }
}

module.exports = {
    getZipCode,
    postZipCode,
    deleteZipCode
}