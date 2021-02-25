const Redis = require('ioredis')
const config = require('config')

const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    keyPrefix : 'cache:',
})

/**
 * @method findOne - Receive a zip code as parameter, find that and return a zip code object
 * @param {string} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
async function findOne(zipCode){
    const value = await redis.get(zipCode)
    return value ? JSON.parse(value) : null
}

/**
 * @method save - Receive a zip code as parameter and save or update
 * @param {object} zipCode - Zip code
 * @returns {object} - Object of zip code
 */
function save(zipCode){
    redis.set(zipCode.zipCode, JSON.stringify(zipCode), 'EX', config.redis.expirationInMinutes * 60)    
    return zipCode
}

/**
 * @method destroy - Receive a zip code as parameter and delete
 * @param {string} zipCode - Zip code
 * @returns {boolean} - return true if zip code has deleted
 */
async function destroy(zipCode){
    let value = await findOne(zipCode)
    if (value) {
        redis.del(zipCode)
        return true
    }

    return false
}

module.exports = {
    findOne,
    save,
    destroy
}