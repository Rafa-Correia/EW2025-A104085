var express = require('express');
var router = express.Router();
var Entrega = require('../controllers/entrega')
var multer = require('multer')

router.get('/', (req, res, next) => {
    Entrega.findAll()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).jsonp(err))
});

router.get('/:id', (req, res, next) => {
    Entrega.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).jsonp(err))
})

router.post('/')

module.exports = router;