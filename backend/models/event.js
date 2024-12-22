const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./database');

const Event = sequelize.define('Event', {
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  event_type: {
    type: DataTypes.ENUM,
    values: ['Activity', 'Community Service', 'other'], 
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interest_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  requested_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  review_notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reviewed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Pending', 'Approved', 'Rejected'], // يمكن إضافة المزيد من الحالات
    defaultValue: 'Pending',
    allowNull: true,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'events', 
  timestamps: false, 
});

module.exports = Event;
