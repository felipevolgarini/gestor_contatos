$("#login").click(function (event) {
    event.preventDefault();

    var options = {};

    options.url = "http://localhost:55516/pessoa/login";
    options.type = "POST";

    var form = $("#form-login").serializeJSON();
    options.data = JSON.stringify(form);

    options.contentType = "application/json";
    options.dataType = "json";

    options.success = function (data) {
        localStorage.setItem("token", data.token);
        document.location.href = "/Pessoa/ListarTodas";
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