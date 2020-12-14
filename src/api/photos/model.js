const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
    },

    tags: {
        type: [String],
        required: true,
        minlength: 1,
        maxlength: 20
    },

    extension: {
        type: String,
        required: true,
        minlength: 1,
    },
});

PhotoSchema.methods = {
    view () {
        let fields = ['_id', 'title', 'author', 'tags', 'extension'];
        let view = {};

        fields.forEach((field) => { view[field] = this[field] });
        return view
    }

};

module.exports = mongoose.model("Photo", PhotoSchema);