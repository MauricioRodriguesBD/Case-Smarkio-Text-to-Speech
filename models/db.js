const Sequelize = require("sequelize")

const sequelize = new Sequelize('mauricio', 'mauricio', '123321475',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}