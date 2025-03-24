var express = require('express');
var router = express.Router();

var Aluno = require("../controllers/alunos")

/* GET alunos listing. */
router.get('/', function(req, res, next) {
  Aluno.list()
    .then(data => {
      res.jsonp(data)
    })
    .catch(error => {
      res.jsonp(error)
    })
});

router.get('/:id', function(req, res, next) {
  Aluno.findById(req.params.id)
    .then(data => {
      res.jsonp(data)
    })
    .catch(error => {
      res.jsonp(error)
    })
});

router.post('/', function(req, res, next) {
  Aluno.insert(req.body)
      .then(data => {
        res.status(201).jsonp(data)
      })
      .catch(error => {
        res.status(500).jsonp(error)
      })
})

router.put('/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
      .then(data => {
        res.status(201).jsonp(data)
      })
      .catch(error => {
        res.status(500).jsonp(error)
      })
})

router.delete('/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
      .then(data => {
        res.status(201).jsonp(data)
      })
      .catch(error => {
        res.status(500).jsonp(error)
      })
})

module.exports = router;
