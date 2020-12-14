const express = require('express');
const cors = require('cors');
const {imagesPath, allowedClientAddress} = require("../../config");
const expressConfig = (apiRoot, routes) => {
  const app = express();

  app.use(express.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });

  app.use(apiRoot, routes);

  let pathFolder = ('/' + imagesPath).toString();
  app.use(pathFolder, express.static(imagesPath)); //we allow all users to get acces to folder with Images of photos



  // 404 Error handler
  app.use((req, res, next) =>  res.status(404).send({error: 'Routing not found'}));

  // 400 Error handler
  app.use((err, req, res, next) =>  {
    console.error(err.message);
    if(err.name === 'CastError')
        return res.status(400).end();
    if(err.name === 'ValidationError')
      return res.status(400).json({error: err.message});
    // handle other errors
    // Otherwise...
    return res.status(500).end();
  });

  return app
};

module.exports = expressConfig;
