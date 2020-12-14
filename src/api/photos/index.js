const { Router } = require('express');
const { add, getById, deletePhoto, likePhoto, dislikePhoto,  getPhoto } = require('./controller');
const token = require('../../middlewares/token')
const router = Router();
const { upload } = require('./uploader');


router.post('/',
    token,
    upload.single('image'),     
    add);

router.get('/:id',
    getById);



//router.get('/me',
//   token,
//   showMe);

router.delete('/:id',
    token,
    deletePhoto);

router.post('/:id/like',
    token,
    likePhoto);

router.post('/:id/dislike',
    token,
    dislikePhoto);

router.get('/',
    token,
    getPhoto)

    
module.exports = router;