const Sequelize = require('sequelize');
const conn = require('../database/database');

const Category = conn.define('category', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Category;