const Sequelize = require('sequelize')
const connection = require('../connection')


const User = connection.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

User.sync({
    force: false
})

module.exports = User