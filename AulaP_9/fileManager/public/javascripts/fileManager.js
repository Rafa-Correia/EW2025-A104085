$(() => {

})

function showImage(name, type) {
    //  close popup (modal)
    $('#display').empty()

    //  fill popup ig?
    if (type == 'image/png' || type == 'image/jpeg') {
        var file = $(`
                <img src="/store/${name}" width='80%' />"
            `)
        var download = $(`
                <div>
                    <a href='/download/${name}' > Download </a>
                </div>
            `)
        $('#display').append(file, download)
    }
    else if (type == 'application/json') {
        $.get(`/filecontents/${name}`, (resp) => {
            var content = JSON.stringify(resp)
            var file = $(`
                    <pre>
                        ${content}
                    </pre>
                `)
            var download = $(`
                    <div>
                        <a href='/download/${name}' > Download </a>
                    </div>
                `)

            $('#display').append(file, download)
        })
        .fail(err => {
            console.log(type)
            console.log(name)
        })
    }
    else if (type == 'text/html') {
        $.get(`/filecontents/${name}`, (resp) => {
            var content = JSON.stringify(resp)
            var file = $(resp)
            var download = $(`
                    <div>
                        <a href='/download/${name}' > Download </a>
                    </div>
                `)

            $('#display').append(file, download)
        })
        .fail(err => {
            console.log(type)
            console.log(name)
        })
    }
    else {
        var file = $(`
                <p>${name}</p>
            `)
        var download = $(`
                <div>
                    <a href='/download/${name}' > Download </a>
                </div>
            `)

        $('#display').append(file, download)
    }

    //  show / render popup (modal)
    $('#display').modal()
}