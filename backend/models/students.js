const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 
const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
   
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  college: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'students', 
  timestamps: false,
});

module.exports = Student;
