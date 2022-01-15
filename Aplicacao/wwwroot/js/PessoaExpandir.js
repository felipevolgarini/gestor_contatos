if (!localStorage.getItem("token")) {
    document.location.href = "/Pessoa/Login";
}

var cont = 1;

function AdicionarTelefone(numero) {
    $("#form-telefone").append(
        `
        <div class="form-group">
            <label for="telefone`+ cont + `">Telefone ` + cont + `</label>
            <input type="text" class="form-control" id="telefone` + cont + `" value="` + numero + `" disabled>
        </div>
       `
    );

    cont++;   
}

var options = {};
options.url = "http://localhost:55516/pessoa/getPessoa?id=" + id;
options.type = "GET";

options.async = false;

options.beforeSend = function (request) {
    request.setRequestHeader("Authorization",
        "Bearer " + localStorage.getItem("token"));
};

options.success = function (data) {
    var pessoa = data.pessoa;

    var dataHora = pessoa.dataNascimento.split("T");
    var aux = dataHora[0].split("-");
    var data = aux[2] + "/" + aux[1] + "/" + aux[0];

    $("#nome").val(pessoa.nome);
    $("#dataNascimento").val(pessoa.dataNascimento);
    
    if (pessoa.telefones) {
        pessoa.telefones.forEach(function (telefone) {
            if (telefone.numero && telefone.numero.trim()) {
                AdicionarTelefone(telefone.numero);
            }
        });
    };   
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

