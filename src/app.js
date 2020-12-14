// Głowny plik aplikacji
const { env, port, ip, apiRoot, imagesPath} = require('./config');
const express = require('./services/express');
const api = require('./api');

require('./services/mongoose'); // Nawiazanie polaczenia z baza
require('dotenv').config();  // Do obslugi zmiennych srodowiskowych!



const app = express(apiRoot, api);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, ip, () => {
  console.log(`Express server listening on http://${ip}:${port}, in ${env} mode`)
});



module.exports = app;
