const {sign} = require("../../services/jwt");

const login = async (req, res, next) => {
    const user = req.user;
    const token = sign(user);
    return res.json({
        user: user.view(),
        token
    })
};

module.exports = {
    login
}
