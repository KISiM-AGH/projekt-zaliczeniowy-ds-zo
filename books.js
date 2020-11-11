const express = require('express');
const router = express.Router();
const books = require('../../Books');

//Gets all books   //use router instead of app
router.get('/', (req, res) => res.json(books));

//Get single member
router.get('/:title', (req, res) => {
    const found = books.some(book => book.title === req.params.title);

    if(found){
        res.json(books.filter(book => book.title === req.params.title));

    }
    else{
      res.status(400).json({ msg: `No book with the title of ${req.params.title}`});

    }
});

module.exports = router;