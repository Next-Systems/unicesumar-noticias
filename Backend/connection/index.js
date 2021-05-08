const Sequelize = require('sequelize')
require('dotenv').config()

const connection = new Sequelize('nextsystems', 'root', process.env.DB_PASS, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    dialect: 'mysql',
    host: 'localhost',
    timezone: '-03:00'
})

module.exports = connection