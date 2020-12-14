const jwt = require("jsonwebtoken");
const config = require("../../config")

const sign = (user) => {
    const options = {
        expiresIn: config.jwtExpiration
    };

    return jwt.sign({
        id: user.id
        // Inne pola ktore maja zostac dodane do tokenu
    }, process.env.JWT_SECRET, options)
};

module.exports = {
    sign
};
