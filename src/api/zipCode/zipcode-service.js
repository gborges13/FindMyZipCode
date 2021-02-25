const repositoryZipcode = require('./zipcode-repository')
const axios = require('axios')
const config = require('config')

async function webSearch(zipCode) {
    try {
        const response = await axios.get(config.searchService.url + zipCode + '/json')

        let {cep, logradouro, bairro, localidade, uf, erro} = response.data

        if (erro) {
            return null
        }

        result = {
            zipCode: cep.replace("-",""),
            address: logradouro,
            district: bairro,
            city:localidade,
            state: uf                  
        }

        saveZipCode(result)
        return result        

    } catch(error) {
        throw error
    }
}

/**
 * @method findZipCode - Receive a zip code as parameter and return a zip code, 
 * if don't find a record will be replacing the last position -1 for 0 while the paramento be different of only zeros
 * @param {string} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
async function findZipCode(zipCode){    
    let result = await repositoryZipcode.findOne(zipCode)
    if (result){
        return result
    } else {
        result = await webSearch(zipCode)
        if (result){
            return result
        }         
    }

    for (let index = zipCode.length; index > 1; index--) {
        zipCode = zipCode.substring(0, index-1) + '0' + zipCode.substring(index, zipCode.length)
        result = await repositoryZipcode.findOne(zipCode)        

        if (result){
            return result
        } else {
            result = await webSearch(zipCode)
            if (result){
                return result
            }         
        }
    }

    return null
}

/**
 * @method saveZipCode - Receive a zip code object and send to repository to save that
 * @param {object} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
function saveZipCode(zipCode){
    return repositoryZipcode.save(zipCode)
}

/**
 * @method deleteZipCode - Receive a zip code object and send to repository to save that
 * @param {string} zipCode - Zip code
 * @returns {boolean} - Return if was successfully
 */
function deleteZipCode(zipCode){
    return repositoryZipcode.destroy(zipCode)
}

module.exports = {
    findZipCode,
    saveZipCode,
    deleteZipCode
}