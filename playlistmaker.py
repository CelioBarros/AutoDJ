import httplib
import json
import os.path
import random
import urllib

def makeplaylist(list):
    usuarios = json.loads(list)
    track_count = {}
    artist_count = {}

    savelocally = False

    key = "e3bbd42a3ccda20f3c97de92cb6d6110"
    con = httplib.HTTPConnection("ws.audioscrobbler.com")

    for usuario in usuarios:
        print "Requisitando dados de"+" "+usuario
        
        if savelocally and os.path.isfile(usuario+".json"):
            file = open(usuario+".json")
            res = json.loads(file.read())
            file.close()
        else:
            con.request("GET", "/2.0?method=user.getTopTracks&format=json&api_key="+key+"&user="+usuario+"&period=overall&limit=200")
            res = json.loads(con.getresponse().read())
            #file = open(usuario+".json", "w")
            #file.write(json.dumps(res))
            #file.close()
      
        for track in res["toptracks"]["track"]:
            artistname = track["artist"]["name"]
            musica = (artistname, track["name"])
            
            if musica not in track_count.keys():
                track_count[musica] = 0
            track_count[musica] += 1
            
            if artistname not in artist_count.keys():
                artist_count[artistname] = set()
            artist_count[artistname].add(usuario)

    playlist = []
    
    maxa = 0
    for s in artist_count.keys():
        maxa = max(maxa, len(artist_count[s]))    
    maxt = max(track_count.values())
    
    for musica in track_count.keys():
        pontuacao = 0.60*track_count[musica]/maxt + 0.40*len(artist_count[musica[0]])/maxa
        playlist.append((musica, pontuacao))
        
    playlist.sort(key=lambda tup: -tup[1])
    toplist = []
    
    for s in playlist:
        if s[1] >= 0.5:
            toplist.append(s[0])

    if len(toplist) > 40:
        toplist = random.sample(toplist, 40)
    
    con.close()
    key = "IQRMDIAMCEAQ0APXZ"
    con = httplib.HTTPConnection("developer.echonest.com")
    ids = []
    
    for s in toplist:
        con.request("GET", "/api/v4/song/search?api_key="+key+"&title="+urllib.quote(s[1].encode('utf-8'), '')+"&artist="+urllib.quote(s[0].encode('utf-8'), '')+"&results=1&bucket=id:spotifyv2-ZZ&bucket=tracks")
        res = json.loads(con.getresponse().read())
        
        if "songs" in res["response"].keys() and len(res["response"]["songs"]) > 0 and len(res["response"]["songs"][0]["tracks"]) > 0:
            ids.append(res["response"]["songs"][0]["tracks"][0]["foreign_id"])

    
    con.close()
    print len(ids)
    return json.dumps(ids)

#makeplaylist("[\"zetareticuliana\", \"joaotargino\"]")
#makeplaylist("[\"vctandrade\", \"salesallan\", \"zetareticuliana\",  \"celiorcbf\",\"cfilemon\", \"joaotargino\", \"joaoarthurbm\", \"nazaga\",\"zananeno\", \"lbalby\", \"andryw\", \"aidapontes\"]")
