const Streampartner = require("./streampartner.js");
module.exports = new Streampartner(
	{
		"title": "Nos Pais",
		"cover": "https://www.nospais.com/wp-content/uploads/2012/08/Logo-jpeg2.jpg",
		"blurb": "Nos Pais live",
		
		"playlist":{
			"title":"Nos Pais",
			"description":"Nos Pais live",
			"kind":"Single Item",
			"ar":"16:9",
			"playlist":[
				{
					"title":"Nos Pais",
					"image":"https://www.nospais.com/wp-content/uploads/2012/08/Logo-jpeg2.jpg",
					"images":[
						{"src":"https://www.nospais.com/wp-content/uploads/2012/08/Logo-jpeg2.jpg","width":639,"type":"image/png"}
					],
					"pubdate":0,
					"sources":[
						{"file":"","type":"application/vnd.apple.mpegurl"}
					],
					"tracks":[{"file":"","kind":"thumbnails"}]
				}
			]
		}
	}
	,
	"Nos Pais",
	2000,
	"https://ssl.streampartner.nl/player.php?url=5rfdekr5tjgifuhrn5tu",
	"https://www.nospais.com/"
);
