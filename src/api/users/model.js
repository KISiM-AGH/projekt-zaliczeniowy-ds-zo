const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 100
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    seenPhotos: {
        type: [String]
    },
    likedPhotos: {
        type: [String]
    },
    similarTaste: [{
        id: String,
        
    }]
        
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    const rounds = 10;

    bcrypt.hash(this.password, rounds).then((hash) => {
        this.password = hash;
        next()
    }).catch(next)
});

UserSchema.methods = {
    view () {
        let fields = ['id', 'username', 'email', 'createdAt', 'seenPhotos', 'likedPhotos'];
        let view = {};

        fields.forEach((field) => { view[field] = this[field] });
        return view
    },

    authenticate (password) {
        return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
    },
};

module.exports = mongoose.model("User", UserSchema);
