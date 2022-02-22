const expressJwt = require('express-jwt');
const secret = process.env.SECRET;

function authJwt(){
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            '/api/v1/userRoute/login',
            '/api/v1/userRoute/register'
        ]
    })
}

module.exports = authJwt;