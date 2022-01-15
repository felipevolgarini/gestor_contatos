if (!localStorage.getItem("token")) {
    document.location.href = "/Pessoa/Login";
}

var cont = 2;

$(document).ready(function () {
    $('#telefone1').mask('(00) 0000-00000');
    $("#dataNascimento").mask('00/00/0000');
});


function AdicionarTelefone() {
    $("#form-telefone").append(
       `
        <div class="form-group">
            <label for="telefone`+ cont +`">Telefone `+ cont +`</label>
            <input type="text" class="form-control" id="telefone` + cont +`">
        </div>
       `
    );

    setTimeout(() => {
        $('#telefone'+cont).mask('(00) 0000-00000');
        cont++;
    }, 0);

    
}

$("#salvar").click(function () {
    event.preventDefault();

    var data = $("#dataNascimento").val();
    data = data.split('/');
    dataAux = data[1];
    data[1] = data[0];
    data[0] = dataAux;
    data = data.join('/');
    var dataNascimento = new Date(data);
    
    if ($("#nome").val().trim() == "") {
        var options = {
            message: "Preencha o nome.",
            title: "Erro",
            buttons: [{ text: 'Ok', style: 'info', close: true }]
        }
        eModal.alert(options);
        return;
    }

   if (data.length != 10 || isNaN(dataNascimento.getTime())) {
        var options = {
            message: "Data de nascimento inválida.",
            title: "Erro",
            buttons: [{ text: 'Ok', style: 'info', close: true }]
        }
        eModal.alert(options);
        return;
    }

    var telefones = [];
    for (i = 1; i <= 10; i++) {
        var numero = $("#telefone" + i).val();
        if (numero && numero.trim()) {
            telefones.push({numero: numero});
        }
    }

    var options = {};
    options.url = "http://localhost:55516/pessoa/adicionar";
    options.type = "POST";

    var json = {
        nome: $("#nome").val(),
        dataNascimento: dataNascimento.toJSON(),
        telefones: telefones
    };


    options.data = JSON.stringify(json);
    
    options.contentType = "application/json";
    options.dataType = "json";

    options.beforeSend = function (request) {
        request.setRequestHeader("Authorization",
            "Bearer " + localStorage.getItem("token"));
    };

    options.success = function (data) {
        $('#form-adicionar').each(function () {
            this.reset();
        });
        var options = {
            message: data.message,
            title: "Aviso",
            buttons: [{ text: 'Ver contatos', style: 'info', close: true, id: 'listar' },
                      { text: 'Cadastrar outra pessoa', style: 'success', close: true }]
        }
        eModal.alert(options).then(function () {
            $("#listar").click(function () {
                document.location.href = "/Pessoa/ListarTodas";
            });
        });
    };

    options.error = function (xhr) {
        if (xhr.status == 401) {
            localStorage.setItem("token", "");
            document.location.href = "/Pessoa/Login";
            return;
        }
        var err;
        if (xhr.responseText == null || xhr.responseText == "") {
            err = {};
            err.message = "Não foi possível conectar-se ao servidor."
        }
        else {
            err = JSON.parse(xhr.responseText);
        }
        var options = {
            message: err.message,
            title: "Erro",
            buttons: [{ text: 'Ok', style: 'info', close: true }]
        }
        eModal.alert(options);
    };

    $.ajax(options);
});
