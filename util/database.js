const Sequelize = require('sequelize');
const sequelize = new Sequelize('note_book-database', 'root', 'pazz1234', {
    dialect:'mysql',
    host:'localhost'
});


module.exports =  sequelize