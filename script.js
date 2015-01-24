$(document).ready(function () {
    $('#button').click(function(){
        var toAdd = $('input[name=checkListItem]').val();
        $(".list").append('<div class="item">' + toAdd + '</div>');
        $("input[name=checkListItem], textarea").val("");


    });

    $(document).on('click', '.item', function(){
        $(this).remove();
    });

    $('#gerarLista').click(function(){
        alert("criando a lista perfeita");
    });

});

