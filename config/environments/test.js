module.exports = {
    env: 'test',
    port: 3000,
    jwt: {
        secret: 'FindMyZipCodePrivateToken',
        enabled: true,
    },
    redis: {
        host: 'localhost',
        port: 6379,
        expirationInMinutes: 5,
    },
    searchService : {
        url : 'http://viacep.com.br/ws/'
    }

}