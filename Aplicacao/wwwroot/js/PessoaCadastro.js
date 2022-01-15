$("#cadastrar").click(function (event) {
    event.preventDefault();

    if ($("#senha").val() != $("#confirmarSenha").val()) {
        var options = {
            message: "As senhas não conferem.",
            title: "Erro",
            buttons: [{ text: 'Ok', style: 'info', close: true }]
        }
        eModal.alert(options)
        return;
    }

    var options = {};

    options.url = "http://localhost:55516/pessoa/cadastro";
    options.type = "POST";

    var form = $("#form-cadastro").serializeJSON();
    options.data = JSON.stringify(form);

    options.contentType = "application/json";
    options.dataType = "json";
    
    options.success = function (data) {
        $('#form-cadastro').each(function () {
            this.reset();
        });
        var options = {
            message: data.message,
            title: "Aviso",
            buttons: [{ text: 'Fazer login', style: 'info', close: true, id: 'login' }]
        }
        eModal.alert(options).then(function () {
            $("#login").click(function () {
                document.location.href = "/pessoa/login";
            });
        });
    };

    options.error = function (xhr) {
        var err;
        if (xhr.responseText == null) {
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