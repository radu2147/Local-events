const crudControllers = require('../crudControllers');
const UserEvents = require('./model');

module.exports = crudControllers(UserEvents);