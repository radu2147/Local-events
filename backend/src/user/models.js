const [user, host, database, password, port] = require('../settings');

const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
        allowNull: false,
        unique: true
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

User.checkPassword = async (pass, dbpass) => {
    let resp = await bcrypt.compare(pass, dbpass);
    return resp;
}

User.sync();

module.exports = User;