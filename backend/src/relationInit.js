const { Sequelize, Model, DataTypes } = require("sequelize");
const Comms = require("./comm/model");
const Event = require("./event/model");
const User = require("./user/models");
const [user, host, database, password, port] = require('./settings');

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })

class UserEvents extends Model{}

UserEvents.init({
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: Event,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    freezeTableName: true, 
    sequelize, 
    modelName: 'userevents'
})

UserEvents.sync({force: true});

module.exports = init;