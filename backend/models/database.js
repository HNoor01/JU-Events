const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('juevents', 'root','1234',  {
  host: 'localhost',
  port : 3306,
  dialect: 'mysql',
});

module.exports = sequelize;
