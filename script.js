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
        //var musicas = ["spotify:track:0gzpfUezy3wdktjC2SD1FY","spotify:track:0oks4FnzhNp5QPTZtoet7c", "spotify:track:3q6TKWVArb6Hm8nVfsiNDu", "spotify:track:3BMNLPH50kY8HkDuwfa60s"];
        //setupPlayer(musicas);

        $.ajax({
            type: "GET",
            url: "http://localhost:5002/["+usuarios +"]"
            //url: "playlistmaker.py"

        }).done(function (o){
            //alert("criando a lista perfeita"),
            //location.href="http://localhost:5002/["+usuarios +"]";
            //envia lista de usuarios lastfm
            //
            var musicas = readJSON("http://localhost:5002/["+usuarios +"]");
            //inicia o player com a lista de musicas
            setupPlayer(musicas);

        });

        for(var i = 0; i < usuarios.length ; i++) {
            console.log(usuarios[i]);
        }
    });

    function readJSON(url){
        var dataframe;

        $.ajax({
            url : url,
            type : 'GET',
            async: false,
            dataType : 'json',
            success: function(data) {
                console.log("success ajax!");
                dataframe = data;
            },
            error: function(xhr, status, error) {
                var error = eval("(" + xhr.responseText + ")");
                console.log(error.Message);
            }
        });

        return dataframe;
    }


    // playlist data
    var currentPlaylist = [];
    var explanations = [];
    var playlistCandidates = []
    //var musicas = ["0y3C8cg1S3YKFRsCOJPkTp", "24LP2wwXRSsFkCtpqLi7p3", "3BMNLPH50kY8HkDuwfa60s"];




    function setupPlayer (musicas) {
        console.log(musicas);

        var missedPoints = 0;


        for(var i = 0; i < musicas.length; i++){
            $("#playlist").attr("src", $("#playlist").attr("src") + musicas[i].split(":")[2] + ",");
        }
        //$.each(this.currentPlaylist, function(i, v) {
        //    if (musicas != null) {
        //        $("#playlist").attr("src", $("#playlist").attr("src") + musicas.id.split(":")[2] + ",");
        //    } else {
        //        missedPoints++;
        //    }
        //});
        //if (missedPoints > 0)
        //    $("#player-status").text("(we couldn't find songs for " + missedPoints + " out of the " + this.knownAnswers + " points in the trip)");
        //navigation.fadeToPlaylist();
    };

});

