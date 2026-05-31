const Streampartner = require("./streampartner.js");
module.exports = new Streampartner(
	{
		"title": "WFM96",
		"cover": "https://play-lh.googleusercontent.com/k-lNl4WiI3HaIyc1F9U5yfQehHw1fiAk4qTHb1hcJyEzYxn2eNqf9wxnqdTW0kgz9Hk=s0",
		"blurb": "Walcheren FM live",
		
		"playlist":{
			"title":"WFM96",
			"description":"WFM96 live",
			"kind":"Single Item",
			"ar":"16:9",
			"playlist":[
				{
					"title":"WFM",
					"image":"https://play-lh.googleusercontent.com/k-lNl4WiI3HaIyc1F9U5yfQehHw1fiAk4qTHb1hcJyEzYxn2eNqf9wxnqdTW0kgz9Hk=s0",
					"images":[
						{"src":"https://play-lh.googleusercontent.com/k-lNl4WiI3HaIyc1F9U5yfQehHw1fiAk4qTHb1hcJyEzYxn2eNqf9wxnqdTW0kgz9Hk=s0","width":512,"type":"image/jpg"}
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
	"WFM96",
	2000,
	"https://ssl.streampartner.nl/player.php?url=c9616ec317ffd9d6d6e1"
);
