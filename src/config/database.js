// Pattern for SQLite (easier for dev)
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // file-based, no server needed
});

module.exports = sequelize;
