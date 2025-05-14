var express = require('express');
var router = express.Router();
var userModel = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.post('/register', function(req, res, next) {
  console.log(req.body)
  userModel.register(
    new userModel({
      username: req.body.username,
      name: req.body.name,
      level: req.body.level,
      active: true,
      creationDate: new Date()
    }),
    req.body.password,
    (err, user) => {
      console.log(user)
      if(err) {
        res.jsonp(err)
      }
      else {
        res.send('Success!')
      }
    }
  )
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  jwt.sign(
    {
      username: req.user.username,
      level: req.user.level,
      sub: 'Aula de EngWeb2025'
    },
    'EngWeb2025',
    {expiresIn: 3600},
    (err, tok) => {
      if(err) {
        res.jsonp(err)
      }
      else {
        res.status(201).jsonp({token: tok})
      }
    }
  )
})

module.exports = router;
