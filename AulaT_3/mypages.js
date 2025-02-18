

export function genMainPage(data) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Oficina Automovel</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Consultas</h1>
                </header>
            </div>

            <div class="w3-container">
                <ul class="w3-ul">
                    <li>
                        <a href="/reps">Lista de Reparacoes</a>
                    </li>
                    <li>
                        <a href="#">Lista de Tipos de Reparacoes</a>
                    </li>
                    <li>
                        <a href="#">Lista de Marcas</a>
                    </li>
                </ul>
            </div>

            <footer class="w3-container w3-purple">
                <h5>Generated in EngWeb2025 ${data}</h5>
            </footer>            
        </body>
    </html>
    `
    return pagHTML
}

export function genRepPage (reps, d) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Oficina Automovel</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Reparacoes</h1>
                </header>
            </div>

            <div class="w3-container">
                <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Data</th>
                        <th># Intervencoes</th>
                    </tr>
                    ` 
                    
                    reps.forEach(r => {
                        pagHTML += `
                        <tr>
                            <td></td>
                            <td>${r.nome}</td>
                            <td>${r.data}</td>
                            <td>${r.nr_intervencoes}</td>
                        </tr>
                        `
                    });

pagHTML +=          ` 
                </table>
            </div>

            <footer class="w3-container w3-purple">
                <h5>Generated in EngWeb2025 ${data}</h5>
            </footer>            
        </body>
    </html>
    `
    return pagHTML
}