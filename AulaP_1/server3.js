const http = require('http');
const meta = require('./auxiliary');

http.createServer((req, resp) => {
    console.log("Method: " + req.method);
    console.log("Url: " + req.url);

    switch(req.method) {
        case 'GET':            
            switch(req.url) {
                case '/data': 
                    resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
                    resp.write("" + meta.myDateTime() + "");
                    break;
                case '/nome': 
                    resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
                    resp.write(meta.myName());
                    break;
                case '/turma': 
                    resp.writeHead(200, {'content-type':'text/html;charset=utf-8'});
                    resp.write(meta.turma);
                    break;

                default:
                    resp.writeHead(404, {'content-type':'text/html;charset=utf-8'});
                    break;
            };
            
            resp.end();

            //resp.write("<p>Olá turma de 2025!</p><i class=\"bi bi-check2\"></i>");
            break;
        
        default:
            resp.writeHead(405, {'content-type':'text/html;charset=utf-8'});
            resp.end();
            break;
    }

    

}).listen(1234);

console.log("Server listening on port 1234.")