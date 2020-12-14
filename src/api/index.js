// Plik centralny API - tu importujemy enpointy (index.js) z poszczegolnych katalogow
const {Router} = require('express');
const users = require('./users');
const auth = require('./auth');
const photos = require('./photos');
// Routing
const router = Router();
router.use('/auth', auth);
router.use('/users', users);
router.use('/photos', photos);
// Inny routing idzie tutaj


module.exports = router;
