const Photo = require('./model');
const User = require('../users/model')
const { sign } = require("../../services/jwt");
const fs = require('fs');
const config = require('../../config'); //config is needed, path for image files is written in it
const mongoose = require("mongoose");
const stream = require('stream');
const add = async (req, res, next) => {


    try {
        const photo = new Photo({
            title: req.body.title,
            author: req.user.id,  //we have user and user.id thanks to middleware tokenizer
            tags: req.body.tags.split(" "), //tags should be separeted by space
            extension: req.file.originalname.split(".")[1]
        });
        const photoForDb = await Photo.create(photo);


        //we should change filename because in DB we do not store actual images, so we need to find it on our space
        //filename will be the same as photo.id but with .ext (.png f.e.)
        //so we change name of the file to "imagesFolder/id.ext"
        fs.rename(config.imagesPath + req.file.originalname, config.imagesPath + photoForDb._id.toString() + '.' + photoForDb.extension,
            function (err) {
                if (err) throw err;
                console.log('renamed complete');
            }
        );

        res.json({
            photo: photoForDb.view()
        });

    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        id = req.params.id;
        await Photo.findById(id).lean().exec().then(photoFound => {    //we do .lean().exec() because we convert mongoose's doc to plain JSON, because we want to add imagePath property
            photoFound.imagePath = config.imagesPath + photoFound._id + '.' + photoFound.extension;
            console.log('Zdjecie zaraz przed wyslaniem: ' + photoFound);
            res.json({
                photoFound
            });
        });
    } catch (err) {
        res.status(404).send('Photo not found');
        next(err);

    }
}



const deletePhoto = async (req, res, next) => {
    let isGood = false;
    try {

        id = req.params.id;

        await Photo.findById(id).then(photoFound => {
            if (req.user.id == photoFound.author) {
                isGood = true;
            } else {
                res.status(403).send('You have no permission to deleting this photo. You are not the author of it.');
                return 0;
            }
        });
    } catch (err) {
        next(err);
    }
    if (isGood) {

        try {
            await Photo.deleteOne({ _id: id });
            res.status(201).send('Done');
        } catch (err) {
            next(err);
        }
    }
}

const likePhoto = async (req, res, next) => {
    try {
        photoId = req.params.id;
        userId = req.user.id;



        await User.findById(userId).then(userFound => {
            changedSmth = false;
            if (!userFound.seenPhotos.includes(photoId)) { //checking if user already have seen this photo
                userFound.seenPhotos.push(photoId);
                changedSmth = true;
            }
            if (!userFound.likedPhotos.includes(photoId)) {  //checking if user already have liked this photo
                userFound.likedPhotos.push(photoId);
                changedSmth = true;
            }
            if (changedSmth) {
                userFound.save();
            }
        });

        res.status(200).send('Succesfully liked a photo');
    } catch (err) {
        next(err);
    }
}

const dislikePhoto = async (req, res, next) => {
    try {
        photoId = req.params.id;
        userId = req.user.id;

        await User.findById(userId).then(userFound => {
            changedSmth = false;
            if (!userFound.seenPhotos.includes(photoId)) { //checking if user already have seen this photo
                userFound.seenPhotos.push(photoId);
                changedSmth = true;
            }
            if (userFound.likedPhotos.includes(photoId)) { //if user wants to dislike already liked photo,
                userFound.likedPhotos.remove(photoId); // we delete this photo from liked array
                changedSmth = true;
            }
            if (changedSmth) {
                userFound.save();
            }
        });

        res.status(200).send('Succesfully disliked a photo');
    } catch (err) {
        next(err);
    }
}

const getPhoto = async (req, res, next) => {

    try {
        userId = req.user.id;
        let randomPhotoId;
        let waitForProperId = false;           
                    let id;                  
                    Photo.findById(id).lean().exec().then(photoFound => {                        
                        photoFound.imagePath = config.imagesPath + photoFound._id + '.' + photoFound.extension;
                        res.json({
                            photoFound
                        });
                    });

                Photo.count().exec(function (err, count) {
                    var random = Math.floor(Math.random() * count);
                    Photo.findOne().skip(random).lean().exec().then(photoFound => {
                        photoFound.imagePath = config.imagesPath + photoFound._id + '.' + photoFound.extension;
                        res.json({
                            photoFound
                        });
                    });
                });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    add,
    getById,
    deletePhoto,
    likePhoto,
    dislikePhoto,
    getPhoto
};
