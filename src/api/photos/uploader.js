const multer = require('multer'); //package to saving files on drive
const config = require('../../config'); //config is needed, path for image files is written in it


const storage =  multer.diskStorage({  //settings for multer
    destination: function(req, file,  callback){    //destination set to config.imagesPath, which is at this time /dirPhotos (but it can change)
        callback(null, config.imagesPath);         // potential error, path
    },

    filename: function(req, file, callback){       //we don't care now about file name, we will change it in the controller, but we need to save extension so originalname will be good
        callback(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    //reject a file
    if( file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cb(new Error('Image must have .png or .jpeg extension'), false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 //we only accept images below 5MB weight
    },
    fileFilter: fileFilter
});

module.exports = {
    storage,
    fileFilter,
    upload
}