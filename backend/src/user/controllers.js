const crudControllers = require('../crudControllers');
const User = require('./models');

module.exports = crudControllers(User);
