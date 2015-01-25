import httplib
import json
import collections
        

def makeplaylist(list):
    usuarios = json.loads(list)
    tracks= []
    artists = {}

    key = "e3bbd42a3ccda20f3c97de92cb6d6110"
    con = httplib.HTTPConnection("ws.audioscrobbler.com")

    i = 0
    while i<len(usuarios):
	print "Requisitando dados de"+" "+usuarios[i]
        con.request("GET", "/2.0?method=user.getTopTracks&format=json&api_key="+key+"&user="+usuarios[i]+"&period=overall&limit=500")
	res = json.loads(con.getresponse().read())
  	
        for j in range(len(res["toptracks"]["track"])):
	    artistname = res["toptracks"]["track"][j]["artist"]["name"]

            tracks.append((artistname,res["toptracks"]["track"][j]["name"]))
            if(artistname not in artists.keys()):
		artists[artistname] = set()
            artists[artistname].add(usuarios[i])
            #tracks.append((res["toptracks"]["track"][j]["artist"]["name"]+" - "+res["toptracks"]["track"][j]["name"]))
        i += 1
    
    repetidas = collections.Counter(tracks)
    #artists = collections.Counter(tracks.keys())
    artist_count = {}

    for j in artists.keys():
	artist_count[j] = len(artists[j])
	#keys()[0][0]
        #if artists.values(j) > 1:
	 #   print j
            #print j[0]
    print [(key, artists[key]) for key in artist_count.keys() if (artist_count[key] > 1)]      
	#print artist_count
    
    for k in artist_count:
        if repetidas[j] > 1:
            print j
    con.close()
    return json.dumps(tracks)

#makeplaylist("[\"zetareticuliana\", \"joaotargino\"]")
makeplaylist("[\"zetareticuliana\",  \"celiorcbf\",\"cfilemon\", \"joaotargino\", \"joaoarthurbm\", \"nazaga\",\"zananeno\", \"lbalby\", \"andryw\", \"aidapontes\", \"talital\", \"vctandrade\", \"igleson_etrom\"]")
