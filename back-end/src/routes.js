const express = require('express');

const GroupController = require('./controllers/GroupController');
const SchoolController = require('./controllers/SchoolController');

const routes = express.Router();

routes.get('/group', GroupController.index);
routes.post('/group', GroupController.create);
routes.delete('/group/:id', GroupController.delete);
routes.put('/group/:id', GroupController.update);

routes.get('/schools', SchoolController.index);
routes.post('/schools', SchoolController.create);
routes.delete('/schools/:id', SchoolController.delete);
routes.put('/schools/:id', SchoolController.update);

module.exports = routes;
