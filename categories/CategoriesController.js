const express = require('express');
const router = express.Router();
const Category = require('./CategoryModel');
const slugify = require('slugify');
const { query } = require('express');

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

//Rota p/ front Edição
router.get('/admin/categories/edit/:id', (req, res) => {
  var id = req.params.id;
  Category.findByPk(id).then(category => {
    if( id == undefined || isNaN(id) ) {
      res.redirect('/admin/categories');
    }
    res.render('admin/categories/edit', {category: category});
  }).catch(error => {
    res.redirect('/admin/categories');
  })
});

//Rota para back edição (Updtate)
router.post('/categories/update', (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  Category.update(
    //oque atualizar
    {
      title: title,
      slug: slugify(title, { lower: true })
    },
    //aonde atualizar
    {where: {
      id: id
    }
  }).then(() => {
    res.redirect('/admin/categories');
  });
});

module.exports = router;