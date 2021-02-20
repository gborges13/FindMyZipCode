const zipCodeService = require('./zipcode-service')

function getZipCode(request, response){
    let {zipCode} = request.body

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