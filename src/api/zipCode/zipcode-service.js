const repositoryZipcode = require('./zipcode-repository')

/**
 * @method findZipCode - Receive a zip code as parameter and return a zip code, 
 * if don't find a record will be replacing the last position -1 for 0 while the paramento be different of only zeros
 * @param {string} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
function findZipCode(zipCode){    
    let result = repositoryZipcode.findOne(zipCode)
    if (result){
        return result
    }

    for (let index = zipCode.length; index > 1; index--) {
        zipCode = zipCode.substring(0, index-1) + '0' + zipCode.substring(index, zipCode.length)
        result = repositoryZipcode.findOne(zipCode)        

        if (result){
            return result
        }    

    }

    return null
}

module.exports = {
    findZipCode
}