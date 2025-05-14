var express = require('express');
var router = express.Router();
var Projeto = require('../controllers/projeto')
var Entrega = require('../controllers/entrega')
const Auth = require('../auth/auth')

/* GET home page. */
router.get('/', Auth.validateDocente, function(req, res, next) {
  if(req.query.uc) {
    Projeto.findByUC(req.query.uc)
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  }

  else {
    Projeto.findAll()
      .then(data => res.status(200).jsonp(data))
      .catch(err => res.status(500).jsonp(err))
  }
});

router.get('/:id', Auth.validateDocente, async function(req, res, next) {
  var nEntregas = await Entrega.countEntregasByPId(req.params.id)

  Projeto.findById(req.params.id)
      .then(data => res.status(200).jsonp({...data.toObject(), nEntregas:nEntregas}))
      .catch(err => res.status(500).jsonp(err))
})

module.exports = router;
