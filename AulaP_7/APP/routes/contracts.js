var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:16000/contratos/')
    .then(resp => {
      res.status(200).render('listContractsPage', {
        'slist': resp.data,
        'date': date
      })
    })
    .catch(error => {
      res.status(500).render('error', {'message': "Internal server error.", 'error' : error})
    })
});

router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  var queryString = 'http://localhost:16000/contratos/' + req.params.id
  axios.get(queryString)
    .then(resp => {
      res.status(200).render('contratoPage', {
        'contract': resp.data,
        'date': date
      })
    })
    .catch(error => {
      res.status(500).render('error', {'message': "Internal server error.", 'error' : error})
    })
});

module.exports = router;
