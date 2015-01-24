import httplib
import json

def makeplaylist(list):
    usuarios = json.loads(list)
    playlist = []

    key = "e3bbd42a3ccda20f3c97de92cb6d6110"
    con = httplib.HTTPConnection("ws.audioscrobbler.com")

    i = 0
    while i<len(usuarios):
        con.request("GET", "/2.0?method=user.getTopTracks&format=json&api_key="+key+"&user="+usuarios[i]+"&period=overall")
        res = json.loads(con.getresponse().read())

        playlist.extend(res["toptracks"]["track"])
        i += 1

    con.close()
    return json.dumps(playlist)