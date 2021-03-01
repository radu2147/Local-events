const [user, host, database, password, port] = require('../settings');

const { Sequelize, DataTypes } = require('sequelize');
const User = require('../user/models');

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
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    link1:{
        type: DataTypes.STRING,
        allowNull: true
    },

    link2:{
        type: DataTypes.STRING,
        allowNull: true
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
    },
    userid:{
        type:DataTypes.BIGINT,
        defaultValue: 1,
        references:{
            model: User,
            key: 'id'
        }
    }
}, {
    freezeTableName: true, 
    sequelize, 
    modelName: 'events'
})

Event.sync();

module.exports = Event;