function logRequests(request, response, next){

    let originalSend = response.send
    let responseData = null

    response.send = function(data) {
        responseData = data        
        originalSend.apply(response, arguments)    
    }

    next();

    let log = {
        request : {
            method : request.method,
            host: request.host,
            url: request.url,
            headers: JSON.stringify(request.headers),
            params : JSON.stringify(request.params),
            body: JSON.stringify(request.body),
        },
        response : {
            statusCode : response.statusCode,
            body: responseData,
            message: response.message
        }

    }   

    console.info(log)

}

module.exports = {
    logRequests
}