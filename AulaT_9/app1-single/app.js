const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15000

app.post('/ficheiro',  upload.single('myFile'), (req, res, next) => {
    console.log("File info: ")
    console.log(JSON.stringify(req.file))
    console.log("Text field info: ")
    console.log(JSON.stringify(req.body))

    res.send(`<p>Got 1 file: ${JSON.stringify(req.file)}</p>`)
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



