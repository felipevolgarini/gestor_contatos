if (!localStorage.getItem("token")) {
    document.location.href = "/Pessoa/Login";
}

function BuscarPessoas(listarMaisDoisTelefones) {
    $("#resultado").html('<h3>Pesquisando...</h3>');

    var options = {};
    options.url = "http://localhost:55516/pessoa/listartodas?listarMaisDoisTelefones=" + listarMaisDoisTelefones;
    options.type = "GET";

    options.async = false;

    options.beforeSend = function (request) {
        request.setRequestHeader("Authorization",
            "Bearer " + localStorage.getItem("token"));
    };

    options.success = function (data) {
        $("#resultado").html('');

        $("#resultado").append(
            "<table id='tabela' class='table table-striped table-bordered table-sm' cellspacing='0' width='100%'>"
            + "<thead>"
            + "<tr>"
            + "<th class='th-sm'>Nome</th>"
            + "<th class='th-sm'>Data de Nascimento</th>"
            + "<th class='th-sm'>Telefones</th>"
            + "<th class='th-sm'></th>"
            + "</tr>"
            + "</thead>"
            + "<tbody id='corpo'>"
        );

        data.pessoas.forEach(function (pessoa) {
            var dataHora = pessoa.dataNascimento.split("T");
            var aux = dataHora[0].split("-");
            var data = aux[2] + "/" + aux[1] + "/" + aux[0];
            var telefones = "";
            if (pessoa.telefones) {
                pessoa.telefones.forEach(function (telefone) {
                    if (telefone.numero && telefone.numero.trim()) {
                        telefones = telefones.concat(telefone.numero).concat("<br />");
                    }                    
                });
            };

            $("#corpo").append(
                "<tr>"
                + "<td>" + pessoa.nome + "</td>"
                + "<td>" + data + "</td>"
                + "<td>" + telefones + "</td>"
                + "<td><button class='btn btn-sm btn-success' type='button' onclick='alterar("+ pessoa.id + ")'>Expandir</button></td>"
                + "</tr>"
            );

            $("#resultado").append(
                "</tbody>"
                + "</table>"
            );
        });
    };

    options.error = function (xhr) {
        if (xhr.status == 401) {
            localStorage.setItem("token", "");
            document.location.href = "/Pessoa/Login";
            return;
        }
        var options = {
            message: "Não foi possível conectar-se ao servidor.",
            title: "Erro",
            buttons: [{ text: 'Ok', style: 'info', close: true }]
        }
        eModal.alert(options);
    };

    $.ajax(options);

    setTimeout(() => {
        $("#tabela").dataTable({
            "ordering": false,
            "oLanguage": {
                "sProcessing": "Processando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                "sInfoFiltered": "",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                }
            }
        });
    }, 0);

    if (listarMais == true) {
        listarMais = false;
        $("#btnMais").hide();
        $("#btnTodas").show();        
    }
    else {
        listarMais = true;
        $("#btnMais").show();
        $("#btnTodas").hide();       
    }
}

var listarMais = false;

BuscarPessoas(listarMais);

function buscar() {
    BuscarPessoas(listarMais);
}

function alterar(id) {
    document.location.href = "/Pessoa/GetPessoa/" + id;
}

