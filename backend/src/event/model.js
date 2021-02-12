const [user, host, database, password, port] = require('../settings');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })

const Event = sequelize.define('events', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type:DataTypes.FLOAT,
        defaultValue: 0.0,
    }
}, {
    freezeTableName: true, 
    sequelize, 
    modelName: 'events'
})

Event.sync();

module.exports = Event;