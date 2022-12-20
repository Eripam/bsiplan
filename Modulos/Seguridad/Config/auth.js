const jwt = require('jsonwebtoken');
const JWT_Secret = 'S!pl@n1';


function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_Secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
  }
  
  module.exports=authenticateToken;