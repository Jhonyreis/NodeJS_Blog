const express = require('express');
const router = express.Router();
const Category = require('./CategoryModel');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});

//rota salvando no Banco
router.post('/categories/save', (req, res) => {
  var title = req.body.title;

  //matando a aplicação em caso de conteúdo null
  if(title == undefined) {
    res.redirect('/admin/categories/new');
  }

  //cotinuando com o registro do DB
  Category.create({
    title: title,
    slug: slugify(title, {
      lower: true
    })
  }).then(() => {
    res.redirect('/admin/categories');
  });

});

//Rota listar as categorias
router.get('/admin/categories', (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/categories/', {categories: categories});
  });
});

//Rota para deletar
router.post('/categories/delete', (req, res) => {
  var id = req.body.id;
  if(id == undefined || isNaN(id)) {
    res.redirect('/admin/categories');
  }
  Category.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/admin/categories');
  });
});

module.exports = router;