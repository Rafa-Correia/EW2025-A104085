import { createServer } from 'http'
import { myDateTime, myName, turma } from './aux1.js'

var myServer = createServer(function (req, res) {
    console.log(req.method + " " + req.url + " " + myDateTime())
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    res.write("<p>Criada com o node.js por " + 
        myName() + " em " + myDateTime() + " na turma " 
        + turma + "</p>")
    res.write("<p>URL: " + req.url + "</p>")
    res.end()
})

myServer.listen(7777)
console.log("Servidor à escuta na porta 7777...")