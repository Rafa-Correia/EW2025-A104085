var express = require('express');
var router = express.Router();
var multer = require('multer')
var jsonfile = require('jsonfile')
var fs = require('fs')

var upload = multer({dest: 'uploads'})

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  jsonfile.readFile(__dirname + '/../data/db.json', (err, fileList) => {
    if(err) {
      res.render('error', {error : err})
    }
    else {
      res.render('index', {files : fileList, date : date})
    }
  })
});

router.post('/', upload.single('_file'), (req, res, next) => {
  console.log('cdir: ' + __dirname);
  var oldPath = __dirname + '/../' + req.file.path
  console.log('o_path: ' + oldPath)
  var newPath = __dirname + '/../public/store/' + req.file.originalname
  console.log('n_path: ' + newPath)

  fs.rename(oldPath, newPath, (err) => {
    if(err) throw err
  })

  var u_date = new Date().toISOString().substring(0, 19)
  
  var files = jsonfile.readFileSync(__dirname + '/../data/db.json')
  files.push({
    date : u_date,
    name : req.file.originalname,
    size : req.file.size,
    mimetype : req.file.mimetype
  })

  jsonfile.writeFileSync(__dirname + '/../data/db.json', files)

  res.redirect('/')
})

router.get('/filecontents/:name', (req, res, next) => {
  console.log(__dirname + '/../public/store/' + req.params.name)
  var content = fs.readFileSync(__dirname + '/../public/store/' + req.params.name)
  res.send(content)
})

router.get('/download/:name', (req, res, next) => {
  console.log(__dirname + '/../public/store/' + req.params.name)
  res.download(__dirname + '/../public/store/' + req.params.name)
})

module.exports = router;
