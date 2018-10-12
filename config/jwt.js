import jwt from 'jsonwebtoken';

exports.generateToken = (payload, expires, callback) => {
    jwt.sign(payload, `rahasia`, {expiresIn: expires}, (err, token) => {
        if(err) { return callback(err, null);}
        return callback(null, token);
    })
}