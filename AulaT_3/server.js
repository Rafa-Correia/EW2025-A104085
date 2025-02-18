import { createServer } from 'http'
import { myDateTime } from './servidor_paginas/aux.js'
import { parse } from 'url'
import { readFile } from 'fs'
import { genMainPage } from './mypages.js'
import { genRepPage } from './mypages.js'
import axios from 'axios'

var myServer = createServer(function (req, res) {
    var d = myDateTime();
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/') {
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write(genMainPage(d))
        res.end()
    }
    else if (req.url == '/reps') {
        axios.get('http://localhost:3000/reparacoes')
        .then(function(resp){
            var reps = resp.data
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write(genRepPage(reps, d))
            res.end()
        })
        .catch(err => {
            console.log("Erro: " + err)
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.end("Erro: " + err)
        })
    }
    else if (req.url.match(/w3\.css$/)) {
        readFile("w3.css", function(erro, dados) {
            if(erro){
                res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else {
                res.writeHead(200, {'Content-Type':'text/css'})
                res.end(dados)
            }
        })
    }
    else {

    }
})

myServer.listen(7777)
console.log("Servidor à escuta na porta 7777...")