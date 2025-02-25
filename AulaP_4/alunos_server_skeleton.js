// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                switch(true) {
                    case req.url == "/alunos":
                        axios.get("http://localhost:3000/alunos")
                            .then(resp => {
                                al = resp.data
                                res.writeHead(200, {"content-type":"text/html; charset=utf-8"})
                                res.write(templates.studentsListPage(al, d))
                                res.end
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        break;

                    case req.url == "/alunos/registo":
                        res.writeHead(200, {"content-type":"text/html; charset=utf-8"})
                        res.write(templates.studentFormPage(d))
                        res.end()
                        break;
                    
                    case req.url.match(/\/alunos\/edit\/(A|PG)\d+$/) != null:
                        id = req.url.split('/')[3]
                        console.log("Edit aluno id: "+id)
                        axios.get("http://localhost:3000/alunos/"+id)
                            .then(resp => {
                                aluno = resp.data
                                res.writeHead(200, {"content-type":"text/html; charset=utf-8"})
                                res.write(templates.studentFormEditPage(aluno, d))
                                res.end()
                            })
                            .catch(error => {
                                console.log(error)
                                res.writeHead(500, {"content-type":"text/html; charset=utf-8"})
                                res.end()
                            })
                        break;
                    default:
                        res.writeHead(404, {"content-type":"text/html; charset=utf-8"})
                        res.end()
                        break;
                }
                // GET /alunos --------------------------------------------------------------------
                
                // GET /alunos/:id --------------------------------------------------------------------
                
                // GET /alunos/registo --------------------------------------------------------------------
               
                // GET /alunos/edit/:id --------------------------------------------------------------------
               
                // GET /alunos/delete/:id --------------------------------------------------------------------
                
                // GET ? -> Lancar um erro
                break
            case "POST":
                switch(true) {
                    case req.url == "/alunos/registo":
                        collectRequestBodyData(req, result => {
                            if(result) {
                                axios.post("http://localhost:3000/alunos", result)
                                    .then(resp => {
                                        res.writeHead(201, {"content-type":"text/html; charset=utf-8"})
                                        res.write(`<h1>Registo Inserido: ${JSON.stringify(result)} </h1>
                                        <a href="/alunos">Voltar atraz</a>`)
                                        res.end()
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        res.writeHead(500, {"content-type":"text/html; charset=utf-8"})
                                        res.end()
                                    })
                            }
                            else {
                                console.log("NO BODY DATA!")
                                res.writeHead(500, {"content-type":"text/html; charset=utf-8"})
                                res.end()
                            }
                        })
                        break;

                    case req.url.match(/\/alunos\/edit\/(A|PG)\d+/) != null:
                        collectRequestBodyData(req, result => {
                            if(result) {
                                axios.put("http://localhost:3000/alunos/"+result.id , result)
                                    .then(resp => {
                                        res.writeHead(200, {"content-type":"text/html; charset=utf-8"})
                                        res.write(`<h1>Aluno Atualizado: ${JSON.stringify(result)} </h1>
                                        <a href="/alunos">Voltar atraz</a>`)
                                        res.end()
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        res.writeHead(500, {"content-type":"text/html; charset=utf-8"})
                                        res.end()
                                    })
                            }
                            else {
                                console.log("NO BODY DATA!")
                                res.writeHead(500, {"content-type":"text/html; charset=utf-8"})
                                res.end()
                            }
                        })
                        break
                        

                    default:
                        res.writeHead(404, {"content-type":"text/html; charset=utf-8"})
                        res.end()
                        break;
                }
                // POST /alunos/registo --------------------------------------------------------------------
                
                // POST /alunos/edit/:id --------------------------------------------------------------------

                // POST ? -> Lancar um erro
                break;
            case "PUT":
                
                break;
            case "DELETE":
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500, {"content-type":"text/html; charset=utf-8"})
                res.write(`<h1>Metodo nao suportado (${req.method}).</h1>`)
                res.end()
                break
        }
    }
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



