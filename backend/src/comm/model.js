const [user, host, database, password, port] = require('../settings');

const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('../user/models');
const Event = require('../event/model');

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    timestamps: false, 
    logging: false
  })

class Comms extends Model{}

Comms.init({
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE
    },
    eventid: {
        type: DataTypes.BIGINT,
        references:{
            model: Event,
            key: 'id'
        }
    },
    userid:{
        type: DataTypes.BIGINT,
        references:{
            model: User,
            key: 'id'
        }
    }
}, 
{
    freezeTableName: true,
    sequelize, 
    modelName: "comms"})

Comms.sync();

module.exports = Comms;