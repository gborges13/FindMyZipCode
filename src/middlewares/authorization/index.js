const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_TOKEN || 'FindMyZipCodePrivateToken'
const applicationToken = ''

function verifyToken(req, res, next){
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Authorization not found.' });
    }
    
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        return res.status(500).json({ auth: false, message: 'Failed to authenticate' });
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