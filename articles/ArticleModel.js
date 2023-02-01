const Sequelize = require('sequelize');
const conn = require('../database/database');
const Category = require('../categories/CategoryModel');

const Article = conn.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

//Criando Referências
//hasMany => Pertence há muitos, Relacionamento 1-p-m (1 categoria pode ter Muitos artigos)
Category.hasMany(Article);
//belongsTo => Pertence há, Relacionamento 1-p-1
Article.belongsTo(Category);

module.exports = Article;
