const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15001

// Tratar o pedido ...
app.post('/ficheiros', upload.array('myFile'), (req, res, next) => {
    console.log("Info on files: ")
    console.log(JSON.stringify(req.files)) // FILES, NOT FILE
    console.log("Text fields info: ")
    console.log(JSON.stringify(req.body.desc))
    res.send(`<p>Got ${req.files.length} files</p>`)
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



