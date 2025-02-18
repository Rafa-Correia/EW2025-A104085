// mypages.js
// 2025-02-17 by jcr
// HTML templates generating functions

export function genMainPage(data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Oficina Automóvel</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Consultas</h1>
                </header>

                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/reps">Lista de Reparações</a>
                        </li>
                        <li>
                            <a href="/tipos">Lista de Tipos de Reparação</a>
                        </li>
                        <li>
                            <a href="/marcas">Lista de Marcas</a>
                        </li>
                    </ul>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genRepPage(lreps, data, marca){
    var i = 0;
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Oficina Automóvel</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Reparações${marca != null ? " - " + marca: ""}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>IdRep</th>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>#Intervenções</th>
                        </tr>`
    lreps.forEach(rep => {
        pagHTML += `
        <tr>
            <td>R${i}</td>
            <td>${rep.nome}</td>
            <td>${rep.data}</td>
            <td>${rep.nr_intervencoes}</td>
        </tr>
        `
        i++
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-purple">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genIntervPage(tipos, data){
    var i = 0;
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Oficina Automóvel</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Tipos de Intervenção</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                        </tr>`
    tipos.forEach(tipo => {
        pagHTML += `
        <tr>
            <td>${tipo.codigo}</td>
            <td>${tipo.nome}</td>
            <td>${tipo.descricao}</td>
        </tr>
        `
        i++
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genMarcaPage(marcas, data){
    var i = 0;
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Oficina Automóvel</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-orange">
                    <h1>Marcas</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Marca</th>
                            <th>Modelos</th>
                        </tr>`
    marcas.forEach(marca => {
        marca.modelo.forEach(modelo => {
            pagHTML += `
            <tr>
                <td>
                    <a href="/marcas/${marca.marca}">
                        ${marca.marca}
                    </a> 
                </td>
                <td>${modelo}</td>
            </tr>
            `
        })   
    });

    pagHTML += `  
                    </table>
                </div>
                
                <footer class="w3-container w3-orange">
                    <h5>Generated in EngWeb2025 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

