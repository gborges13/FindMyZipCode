let zipCodes = [
    {
        zipCode : "14400000",
        address : "Av. Alonso y Alonso",
        district: "Centro",
        city: "Franca",
        state: "SP"
    },
    {
        zipCode : "14400001",
        address : "Av Presidente Vargar",
        district: "Cidade Nova",
        city: "Franca",
        state: "SP"
    },
    {
        zipCode : "14400002",
        address : "Rua Ana Maria",
        district: "Parque Castelo",
        city: "Franca",
        state: "SP"
    },
    {
        zipCode : "14400003",
        address : "Rua Philipina Borges",
        district: "Jardim Noemia",
        city: "Franca",
        state: "SP"
    },
    {
        zipCode : "15500000",
        address : "Rua Triunfo",
        district: "Jardim Botanico",
        city: "Ribeirão Preto",
        state: "SP"
    },
    {
        zipCode : "10000000",
        address : "Avenida Paulista",
        district: "Centro",
        city: "São Paulo",
        state: "SP"
    },
    {
        zipCode : "10000001",
        address : "Avenida Faria Lima",
        district: "Centro",
        city: "São Paulo",
        state: "SP"
    },
    
]

/**
 * @method findOne - Receive a zip code as parameter, find that and return a zip code object
 * @param {string} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
function findOne(zipCode){
    const result = zipCodes.find(x => {
        return x.zipCode === zipCode
    })
    return result
}

/**
 * @method save - Receive a zip code as parameter and save or update
 * @param {object} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
function save(zipCode){
    const index = zipCodes.findIndex(x => {
        return x.zipCode === zipCode.zipCode
    })

    if (index < 0){
        zipCodes.push(zipCode)
    } else {
        zipCodes[index] = zipCode
    }
    return zipCode
}

/**
 * @method destroy - Receive a zip code as parameter and delete
 * @param {string} zipCode - Zip code
 * @returns {boolean} - return true if zip code has deleted
 */
function destroy(zipCode){
    const index = zipCodes.findIndex(x => {
        return x.zipCode === zipCode
    })

    if (index < 0){
        return false
    }

    zipCodes.splice(index, 1)
    return true
}

module.exports = {
    findOne,
    save,
    destroy
}