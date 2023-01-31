const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
  res.send('meu artigo');
});

router.get('/admin/articles/new/', (req, res) => {
  res.send('meu novo artigo será criada');
});

module.exports = router;