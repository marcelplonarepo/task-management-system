const Sequelize = require('sequelize');

const sequelize = require('../utils/databaseConnection');

const Tasks = sequelize.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: Sequelize.STRING(4096),
    deadline: Sequelize.DATE,
    points: Sequelize.INTEGER,
    status: Sequelize.BOOLEAN,
    reward: Sequelize.STRING,
    
})

module.exports = Tasks;