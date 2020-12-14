const User = require('./model');
const {sign} = require("../../services/jwt");

const create = async ({body}, res, next) => {
    try {
        const user = await User.create(body);
        res.json({
            user: user.view(),
            token: sign(user)
        })
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({
                message: 'Email or username already registered'
            })
        }
        next(err);
    }

};



const index = async ({query}, res, next) => {
    let users = await User.find();
    // Staramy się NIGDY nie zwracac danych bezposrednio z bazy (bez filtracji pól), choc hasla za zaszyfrowane,
    // ich upubliczenienie to powazna luka bezpieczenstwa!
    users = users.map(user => user.view());
    res.json(users);
};

const showMe = async (req, res, next) => {
    let {user} = req;       // w req znajduje sie tylko ID uzytkownika dolaczone przez middleware,
                            // jesli potrzebujemy wiecej danych (email, username) mozemy je pobrac, albo w kontrolerze albo w middlewarze
    res.json(user);
};




module.exports = {
    create, index, showMe
};
