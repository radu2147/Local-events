const [user, host, database, password, port] = require('../settings');

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    timestamps: false, 
    logging: false
  })

class Comms extends Model{}

Comms.init({
    username: {
        allowNull: false,
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, 
{
    freezeTableName: true,
    sequelize, 
    modelName: "comms"})

Comms.sync({force: true});

module.exports = Comms;