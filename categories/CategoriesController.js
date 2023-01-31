const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
  res.send('minha categoria');
});

router.get('/admin/categories/new/', (req, res) => {
  res.send('minha nova categoria será criada');
});

module.exports = router;