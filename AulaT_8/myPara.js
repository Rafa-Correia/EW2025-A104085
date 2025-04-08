
$(function() {
    var para_count = 0;

    //load paragraphs on DB
    $.get('http://localhost:3000/paras', (resp) => {
        para_count = resp.length
        resp.forEach(p => {
            
            $("#paraList").append(
                `
                <li p_id="${p.id}">
                    <b> ${p.date} </b>: ${p.p}
                    <button class="w3-button w3-small w3-red removeP"> Delete </button>
                </li>
                `
            )
        });
    })

    $("#addPara").click(() => {
        let text = $("#paraText").val()
        var n_date = new Date()
        let date = n_date.toISOString().substring(0, 19)

        let new_para = {
            p: text,
            date: date,
            id: 'p' + para_count
        }
        
        $.post({
            url: 'http://localhost:3000/paras',
            data: JSON.stringify(new_para),
            headers: {
                'Content-Type' : 'application/json'
            },
            dataType: 'json',
            success: (resp) => {
                alert("Success! Paragraph inserted into DB: " + JSON.stringify(resp))

                para_count += 1
                $("#paraText").val("")

                $("#paraList").append(
                    `
                    <li p_id="${new_para.id}">
                        <b> ${new_para.date} </b>: ${new_para.p}
                        <button class="w3-button w3-small w3-red removeP"> Delete </button>
                    </li>
                    `
                )
            },
            error: (err) => {
                alert("Error! Failed to insert paragraph into DB: " + JSON.stringify(err))
            }
        })
    })

    $("#paraList").on("click", ".removeP", () => {
        let li_elem = $(this).parent()
        let para_id = li_elem.attr("p_id")

        $.ajax({
            url: `http://localhost:3000/paras/${para_id}`,
            type: "DELETE",
            success: () => {
                li_elem.remove()
            },
            error: (err) => {
                alert("Failed to remove " + para_id + ": " + JSON.stringify(err))
            }
        })
    })
})