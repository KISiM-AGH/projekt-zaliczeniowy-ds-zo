const express = require ('express');
const path = require('path');//path js module
//const books = require('./Books');
const logger = require('./middleware/logger');
//const env = process.env.NODE_ENV || 'development';
const app = express();
//app.use(express.json());


//init middleware
//app.use(logger);

app.use('/api/books', require('./routes/api/books')); //add to route



/*app.post('/books', (req, res) => {
    const {title, author}=req.body;
    const book ={title, author}
    db.push(book);
    res.status(201).send(book);
})*/
const PORT = process.env.PORT || 5000; //nr portu ze zmiennych albo nr portu




app.listen(PORT, () => console.log("Server started on port %s ",PORT)); //jezeli dziala, to wypisze
