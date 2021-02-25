const jwt = require('jsonwebtoken')
const config = require('config')
const SECRET = config.jwt.secret

function verifyToken(request, response, next){
    if (!config.jwt.enabled) {
      next()
      return
    }

    const token = request.headers['authorization']
    if (!token) {
        return response.status(401).json({ message: 'Authorization not found.' })
    }
    
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        return response.status(401).json({ auth: false, message: 'Failed to authenticate' })
      }
      
      next()
    });
}

function createToken(){
    if (!config.jwt.enabled) {
      console.log('JWT security is disabled') 
      return
    }

    const applicationToken = jwt.sign({}, SECRET, {noTimestamp : false})
    console.log('JWT token:', applicationToken)
}

createToken()

module.exports = {
    verifyToken
}