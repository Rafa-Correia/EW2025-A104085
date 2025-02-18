const http = require('http');
const meta = require('./auxiliary');

http.createServer((req, resp) => {
    console.log("Method: " + req.method);
    console.log("Url: " + req.url);

    resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});

    switch(req.url) {
        case '/data': 
            resp.write(meta.myDateTime());
            break;
        case '/nome': 
            resp.write(meta.myName());
            break;
        case '/turma': 
            resp.write(meta.turma);
            break;
    };

    //resp.write("<p>Olá turma de 2025!</p><i class=\"bi bi-check2\"></i>");
    resp.end();
}).listen(1234);

console.log("Server listening on port 1234.")