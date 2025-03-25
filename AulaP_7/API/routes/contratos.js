var express = require('express');
var router = express.Router();
var contrato = require('../controllers/contrato')

/* GET contracts homepage. */
router.get('/', function(req, res, next) {
  if(req.query.entidade) {
    contrato.getContratosByEntidade(req.query.entidade)
      .then((data) => {
        res.status(200).jsonp(data)
      })
      .catch(error => {
        res.status(500).jsonp(error)
      })
  }
  else if(req.query.tipo) {
    contrato.getContratosByTipo(req.query.tipo)
      .then((data) => {
        res.status(200).jsonp(data)
      })
      .catch(error => {
        res.status(500).jsonp(error)
      })
  }
  else {
    contrato.getContratos()
      .then((data) => {
        res.status(200).jsonp(data)
      })
      .catch(error => {
        res.status(500).jsonp(error)
      })
  }
});

/* GET entities sorted alphabetically. */
router.get('/entidades', function(req, res, next) {
  contrato.getEntidades()
    .then((data) => {
      console.log(data)
      res.status(200).jsonp(data)
    })
    .catch(error => {
      res.status(500).jsonp(error)
    })
});

/* GET types sorted alphabetically. */
router.get('/tipos', function(req, res, next) {
  contrato.getTipos()
    .then((data) => {
      console.log(data)
      res.status(200).jsonp(data)
    })
    .catch(error => {
      res.status(500).jsonp(error)
    })
});


/* GET contract by id. */
router.get('/:id', function(req, res, next) {
  contrato.getContratoById(req.params.id)
    .then((data) => {
      console.log(data)
      res.status(200).jsonp(data)
    })
    .catch(error => {
      res.status(500).jsonp(error)
    })
});

/* POST contract. */
router.post('/', function(req, res, next) {
  contrato.insert(req.body)
    .then((data) => {
      console.log(data)
      res.status(200).jsonp(data)
    })
    .catch(error => {
      res.status(500).jsonp(error)
    })
});

/* POST contract. */
router.put('/:id', function(req, res, next) {
  contrato.update(req.body, req.params.id)
    .then((data) => {
      console.log(data)
      res.status(200).jsonp(data)
    })
    .catch(error => {
      res.status(500).jsonp(error)
    })
});

/* DELETE contract. */
router.delete('/:id', function(req, res, next) {
  contrato.delete(req.params.id)
    .then((data) => {
      console.log(data)
      res.status(200).jsonp(data)
    })
    .catch(error => {
      res.status(500).jsonp(error)
    })
});



module.exports = router;
