const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: DataTypes.STRING,
  name: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('customer', 'moderator'),
    defaultValue: 'customer'
  },
  phone: DataTypes.STRING,
  settings: {
    type: DataTypes.JSONB,
    defaultValue: { theme: 'light', soundNotifications: true }
  }
}, {
  timestamps: true
});

module.exports = User;