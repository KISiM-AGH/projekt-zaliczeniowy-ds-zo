const { Router } = require('express');
const { create, index, deleteUser, showMe } = require('./controller');
const token = require('../../middlewares/token')
const router = Router();

router.post('/',
    create);

router.get('/',
    token,
    index);


router.get('/me',
    token,
    showMe);



router.get('/api/users', (req,res)=>{
    res.json(users);
});

module.exports = router;
