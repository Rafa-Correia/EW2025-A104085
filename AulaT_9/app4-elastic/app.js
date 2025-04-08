const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

const app = express()
const port = 15001

// Tratar o pedido ...
app.post('/ficheiros', upload.array('myFile'), (req, res, next) => {
    console.log("Info on files: ")
    console.log(JSON.stringify(req.files)) // FILES, NOT FILE
    console.log("Text fields info: ")
    console.log(JSON.stringify(req.body.desc))
    
    var store = __dirname + '\\store'
    if (!fs.existsSync(store)){
        fs.mkdirSync(store);
    }
    var imgs = __dirname + '\\store\\images'
    if (!fs.existsSync(imgs)) {
        fs.mkdirSync(imgs)
    }
    var texts = __dirname + '\\store\\texts'
    if (!fs.existsSync(texts)) {
        fs.mkdirSync(texts)
    }
    
    req.files.forEach(file => {
        console.log(`File -> ${file.originalname}`)
        let old_path = __dirname + '\\..\\' + file.path
        console.log(old_path)

        var new_dir = __dirname;
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            new_dir += imgs + '\\'
        }
        else {
            new_dir += texts + '\\'
        }
        new_dir += file.originalname
        console.log(new_dir)

        fs.rename(old_path, new_dir, function (err) {
            if (err) throw err
            console.log('Successfully renamed - AKA moved!')
        })
    });
    
    res.send(`<p>Got ${req.files.length} files</p>`)
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



