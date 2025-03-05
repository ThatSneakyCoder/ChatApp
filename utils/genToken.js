const jwt = require("jsonwebtoken");

module.exports.genToken = (user) => {
    return jwt.sign({email: user.email, password: user.password}, 'secretkey', { expiresIn: '1h' });
}