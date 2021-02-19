const repositoryZipcode = require('./zipcode-repository')

/**
 * @method findZipCode - Receive a zip code as parameter and return a zip code, 
 * if don't find a record will be replacing the last position -1 for 0 while the paramento be different of only zeros
 * @param {string} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
function findZipCode(zipCode){    
    return repositoryZipcode.findOne(zipCode)
}

module.exports = {
    findZipCode
}