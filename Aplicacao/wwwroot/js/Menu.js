if (localStorage.getItem("token") == null || localStorage.getItem("token") == "") {
    $(".menuLogado").hide();
    $(".menuNaoLogado").show();
}
else {
    $(".menuLogado").show();
    $(".menuNaoLogado").hide();
}

$("#logoff").click(function () {
    localStorage.setItem("token", "");
    document.location.href = "/home/index";
})