var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
      title: 'EngWeb2025', 
      docente: 'JCR',
      instituicao: 'DI-UM'
    });
});

router.get('/movies', function(req, res, next) {
  axios.get('http://localhost:3000/movies')
    .then(resp => {
      movieList = resp.data
      res.render('movies', {movieList: resp.data, tit: 'Movie List'})
    })
    .catch(err => {
      console.log(err)
      res.render('error', {error: err})
    }) 
});



module.exports = router;
