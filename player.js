$(document).ready(function () {
    console.log("init");

    setupPlayer();

    // playlist data
    var currentPlaylist = [];
    var explanations = [];
    var playlistCandidates = []
    //var musicas = ["0y3C8cg1S3YKFRsCOJPkTp", "24LP2wwXRSsFkCtpqLi7p3", "3BMNLPH50kY8HkDuwfa60s"];



    //function buildTextualDetails (explanationIndex, tracks, chosen) {
    //    var point = this.flightPlanCoordinates[explanationIndex];
    //    if (chosen == null || chosen == undefined) {
    //        return "<span class=\"text-muted\"> Point " + (explanationIndex + 1) + ": we couldn't find music for the trip near </span> <span id='exp-" + explanationIndex + "'>" + point;
    //    } else {
    //        var artists = [];
    //        $.each(tracks, function(i, v) {
    //            var toadd = " ";
    //            if (i > 0 && i == tracks.length - 1)
    //                toadd += "or ";
    //            artists.push(toadd + v.track_name.split(" -")[0]);
    //        });
    //        var chosenTrackName = chosen.track_name;
    //        return "<span class=\"text-muted\">Point " + (explanationIndex + 1) + ": around </span> <span id='exp-" + explanationIndex + "'>" + point + "</span> <span class=\"text-muted\"> we thought of </span>" + artists + "<span class=\"text-muted\">. We chose </span>" + chosenTrackName;
    //    }
    //};
    //
    //function updateDetails () {
    //    $("#choice_details").empty();
    //    $.each(this.explanations, function(i, v) {
    //        var toadd = "<li class=\"list-group-item\">" + v + "</li>";
    //        $("#choice_details").append(toadd);
    //    });
    //    this.createNamesForCoordinates(this.flightPlanCoordinates);
    //};

    function setupPlayer () {
        console.log("musicaaaa");
        var missedPoints = 0;
        var musicas = ["spotify:track:0y3C8cg1S3YKFRsCOJPkTp", "spotify:track:24LP2wwXRSsFkCtpqLi7p3", "spotify:track:3BMNLPH50kY8HkDuwfa60s"];

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
    //    if (missedPoints > 0)
    //        $("#player-status").text("(we couldn't find songs for " + missedPoints + " out of the " + this.knownAnswers + " points in the trip)");
    //    navigation.fadeToPlaylist();
    //};

});

