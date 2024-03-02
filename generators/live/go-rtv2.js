const Streampartner = require("./streampartner.js");
module.exports = new Streampartner(
	{
		"title": "GO RTV",
		"cover": "https://www.go-rtv.nl/template/assets/img/logo.png",
		"blurb": "GO RTV live",
		
		"playlist":{
			"title":"GO RTV",
			"description":"GO RTV live",
			"kind":"Single Item",
			"ar":"16:9",
			"playlist":[
				{
					"title":"GO RTV",
					"image":"https://www.go-rtv.nl/template/assets/img/logo.png",
					"images":[
						{"src":"https://www.go-rtv.nl/template/assets/img/logo.png","width":800,"type":"image/png"}
					],
					"pubdate":0,
					"sources":[
						{"file":"","type":"application/vnd.apple.mpegurl"}
					],
					"tracks":[{"file":"","kind":"thumbnails"}]
				}
			]
		}
	},
	"RTV-GO",
	2000,
	"https://ssl.streampartner.nl/player.php?url=c9616ec317ffd9d6d6e1"
);
