const express = require('express');

const ClassController = require('./controllers/ClassController');
const SchoolController = require('./controllers/SchoolController');

const routes = express.Router();

routes.get('/class', ClassController.index);
routes.post('/class', ClassController.create);
routes.delete('/class/:id', ClassController.delete);


routes.get('/schools', SchoolController.index);
routes.post('/schools', SchoolController.create);
routes.delete('/schools/:id', SchoolController.delete);


module.exports = routes;
