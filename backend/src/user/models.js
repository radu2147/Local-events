const [user, host, database, password, port] = require('../settings');

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
  })

class User extends Model{}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    freezeTableName: true,
    modelName: "users"
})

User.sync();

module.exports = User;