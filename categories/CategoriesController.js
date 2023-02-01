const express = require('express');
const router = express.Router();
const Category = require('./CategoryModel');
const slugify = require('slugify');

router.get('/admin/categories/new/', (req, res) => {
  res.render('admin/categories/new');
});

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
    res.redirect('/');
  });

});

module.exports = router;