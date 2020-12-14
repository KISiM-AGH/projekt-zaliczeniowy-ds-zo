// Konfiguracja aplikacji
const dotenv = require('dotenv');

dotenv.config();


const config = {
        env: process.env.NODE_ENV || 'development',
        port:  9000, //process.env.PORT ||
        ip: '0.0.0.0',
        apiRoot: '/api',
        mongo: {
                host: process.env.DB_CONNECT
                ,                  
                options: {
                        useNewUrlParser: true,
                        useCreateIndex: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                        debug: true
                }
        },
        jwtExpiration: "30d",
        imagesPath: 'dirPhotos/',
        allowedClientAddress: 'http://127.0.0.1:3000'
};

module.exports = config;
