const User = require('../api/users/model')

module.exports = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');


    User.findOne({ username }).then(user => {
        if (!user) {
            return res.status(401);
        }
        return user.authenticate(password, user.password).then((user) => {
            if(!user) return res.status(403);

            req.user = user;
            next();

        }).catch(err =>{
            console.log("Mongoose 'findOne' failed for user: " + username );
        })
    });
};
