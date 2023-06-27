const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())

require('dotenv').config();

const controller = require('./api/controller.js');

app.use(express.urlencoded({ extended:true , limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('dist'));
app.use(express.static('public'));

app.post('/api/login', controller.login);
app.post('/api/usuario', controller.createUser);

app.get('/api/sync', controller.findAllSync);
app.post('/api/sync', controller.saveSync);

app.get('/api/dashboard', controller.findDashboardInfo);
app.get('/api/casosearch', controller.searchCaso);

app.listen(3080, function () {
  console.log('Api listening on port 3080!');
});
