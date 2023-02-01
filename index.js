const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conn = require('./database/database');

//carregando Rotas externas
const categoriesController = require('./categories/CategoriesController');
const articleController = require('./articles/ArticlesController');

//importando Models
const Category = require('./categories/CategoryModel');
const Article = require('./articles/ArticleModel');

//Forçando a reescrita de tabelas no DB - (caso crie novos relacionamentos ou reset nas tabelas)
// conn.sync({ force: true })
//   .then(() => {
//     console.log('Tables created successfully');
//   })
//   .catch(err => {
//     console.error('Error creating tables: ', err);
//   });

//carregando a view engine
app.set('view engine', 'ejs');

//arquivos estáticos
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//conection DB
conn
  .authenticate()
  .then(() => {
    console.log('conectato com o banco!')
  })
  .catch((err) => {
    console.log(err);
  });

//carregando as rotas criadas via controlller (padrão MVC)
app.use('/', categoriesController);
app.use('/', articleController);

//rota principal
app.get('/', (req, res) => {
  res.render('index');
});

//rodando serviço
app.listen(8080, () => {
  console.log('rodando');
});
