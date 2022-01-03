const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn:'2h'
        }, (error, token) => {
            if( error ){
                reject("Error to generte jwt")
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = generateJwt;