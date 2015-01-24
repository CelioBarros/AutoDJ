$(document).ready(function () {
    var usuarios = [];
    $('#button').click(function(){
        var toAdd = $('input[name=checkListItem]').val();
        $(".list").append('<div class="item">' + toAdd + '</div>');
        $("input[name=checkListItem], textarea").val("");
        usuarios.push('"' + toAdd + '"');


    });

    //$(document).on('click', '.item', function(){
    //    $(this).remove();
    //});

    $('#gerarLista').click(function(){

        $.ajax({
            type: "GET",
            url: "http://localhost:5002/["+usuarios +"]"
        }).done(function (o){
            alert("criando a lista perfeita");
        });

        for(var i = 0; i < usuarios.length ; i++) {
            console.log(usuarios[i]);
        }
    });

});

