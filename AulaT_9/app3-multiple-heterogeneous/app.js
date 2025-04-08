const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15002

// Tratar o pedido ...
app.post('/ficheiros', upload.fields([{name:'imagens', maxCount: 2}, {name:'textos', maxCount: 2}]), (req, res, next) => {
    console.log("Files: ")
    console.log(JSON.stringify(req.files))
    console.log("Desc: ")
    console.log(JSON.stringify(req.body))
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



