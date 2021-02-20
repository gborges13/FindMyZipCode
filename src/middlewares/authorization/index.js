const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_TOKEN || 'FindMyZipCodePrivateToken'
let applicationToken = ''

function verifyToken(request, response, next){
    const token = request.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Authorization not found.' });
    }
    
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        return response.status(500).json({ auth: false, message: 'Failed to authenticate' });
      }
      
      next();
    });
}

function createToken(){
    applicationToken = jwt.sign({}, SECRET, {noTimestamp : false})
    console.log('JWT token:', applicationToken)
}

createToken()

module.exports = {
    verifyToken,
    applicationToken
}