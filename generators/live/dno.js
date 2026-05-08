const Streampartner = require("./streampartner.js");
module.exports = new Streampartner(
	{
		"title": "DNO TV",
		"cover": "https://i.imgur.com/1Ry7uDP.png",
		"blurb": "DNO TV live",
		
		"playlist":{
			"title":"DNO TV",
			"description":"DNO TV live",
			"kind":"Single Item",
			"ar":"16:9",
			"playlist":[
				{
					"title":"DNO TV",
					"image":"https://i.imgur.com/1Ry7uDP.png",
					"images":[
						{"src":"https://i.imgur.com/1Ry7uDP.png","width":350,"type":"image/png"}
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
	"DNO",
	2000,
	"https://ssl.streampartner.nl/player.php?url=3edfgt67ujhgtre4dfr&ref=wijzijndno2"
);
