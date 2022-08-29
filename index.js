//if using self-hosted player: copy jwplayer files into /public/ and switch playHtml
//bidding.js
//dai.js
//freewheel.js
//gapro.js
//googima.js
//jwplayer.amp.js
//jwplayer.beaut.js
//jwplayer.controls.js
//jwplayer.controls.tizen.js
//jwplayer.core.controls.html5.js
//jwplayer.core.controls.js
//jwplayer.core.controls.polyfills.html5.js
//jwplayer.core.controls.polyfills.js
//jwplayer.core.js
//jwplayer.js
//jwplayer.stats.js
//jwpsrv.js
//polyfills.intersection-observer.js
//polyfills.webvtt.js
//provider.airplay.js
//provider.cast.js
//provider.hlsjs.js
//provider.html5.js
//provider.shaka.js
//related.js
//vast.js
//vttparser.js
//not all of these are necessary

const express = require("express");
const fs = require("fs");
const playHtml = require("./playerExt.html");//require("./player.html"); for self-hosted
const epHtml = require("./episode.div");
const srHtml = require("./series.div");
const prHtml = require("./programme.html");
const erHtml = require("./error");
const KEY = "x5VJVyr70la0Joby2AIBgBCa9CqNJcD+X1Ad2IOAgvkD9nmOlD0ojw=="; //those who know, know lol (not actual key, just for those thinking i leaked my key)
let app = express();
let server = app.listen(80, listening);
function listening(){
	console.log("listening. . .");
}

app.use(express.static('public'));
app.get("/pls/:programme/:series/:episode", (req, res)=>{
	res.set("Content-Type", "application/json")
	try{
		const rjsn = JSON.parse(fs.readFileSync("./data/playlist/"+req.params.programme+".json")).series[req.params.series].episodes[req.params.episode];
		if(!rjsn) throw("Hey, there are not that many episodes lol");
		res.send(rjsn);
	}
	catch(err){
		res.status(400).send(`{error: "${err}"}`);
	}
});
app.get("/:programme/:series/:episode", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		const ep=JSON.parse(fs.readFileSync("./data/playlist/"+req.params.programme+".json")).series[req.params.series].episodes[req.params.episode];
		res.send(playHtml({title:ep.title, KEY, ar:ep.ar, pls: `/pls/${req.params.programme}/${req.params.series}/${req.params.episode}`, parent: `/${req.params.programme}/${req.params.series}`}));
	}
	catch(err){
		res.status(400).send(erHtml(err));
	}
});
app.get("/:programme", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		const prg=JSON.parse(fs.readFileSync("./data/playlist/"+req.params.programme+".json"));
		let series="";
		prg.series.forEach((s, i)=>{
			let eps="";
			s.episodes.forEach((e, j)=>{
				eps+=epHtml({num: j, image: e.playlist[0].image, title: e.smallTitle, series: i});
			});
			series+=srHtml({series: i, title: s.title, cover: s.cover, episodes: eps});
		});
		res.send(prHtml({title: prg.title, image: prg.cover, series}));
	}
	catch(err){
		res.status(400).send(erHtml(err));
	}
});




//always at end
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname +"/public/404.html");
})