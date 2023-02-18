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
const homeHtml = require("./home.html");
const playHtml = require("./playerExt.html");//require("./player.html"); for self-hosted
const epHtml = require("./episode.div");
const srHtml = require("./series.div");
const stHtml = require("./section.div");
const imHtml = require("./item.div");
const prHtml = require("./programme.html");
const flHtml = require("./film.html");
const erHtml = require("./error.html");
const muHtml = require("./menu.div");
const escape = require("./escape");
const KEY = "x5VJVyr70la0Joby2AIBgBCa9CqNJcD+X1Ad2IOAgvkD9nmOlD0ojw=="; //those who know, know lol (not actual key, just for those thinking i leaked my key)
let app = express();
let server = app.listen(process.env.PORT || 3000, listening);
function listening(){
	console.log("listening. . .");
}

app.use(express.static('public'));
app.get("/pls/film/:film/", (req, res)=>{
	res.set("Content-Type", "application/json")
	try{
		req.params.film=req.params.film.replaceAll(/\.\.(\/|\\)/g, "");
		const rjsn = JSON.parse(fs.readFileSync("./data/film/"+req.params.film+".json"));
		res.send(rjsn.playlist);
	}
	catch(err){
		if(err.toString().indexOf("no such file or directory")!=-1)res.status(404).send(`{"error": "no_programme"}`);
		else res.status(500).send(`{"error": "${err}"}`);
	}
});
app.get("/pls/:programme/:series/:episode", (req, res)=>{
	res.set("Content-Type", "application/json")
	try{
		req.params.programme=req.params.programme.replaceAll(/\.\.(\/|\\)/g, "");
		const rjsn = JSON.parse(fs.readFileSync("./data/playlist/"+req.params.programme+".json"));
		const ser = rjsn.series[req.params.series];
		if(!ser) {
			res.status(404).send(`{"error": "no_series"}`);
			return;
		}
		const ep = ser.episodes[req.params.episode];
		if(!ep) {
			res.status(404).send(`{"error": "Hey, there are not that many episodes lol"}`);
			return;
		}
		res.send(ep);
	}
	catch(err){
		if(err.toString().indexOf("no such file or directory")!=-1)res.status(404).send(`{"error": "no_programme"}`);
		else res.status(500).send(`{"error": "${err}"}`);
	}
});
app.get("/film/:film/play", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		req.params.film=req.params.film.replaceAll(/\.\.(\/|\\)/g, "");
		console.log(req.params)
		const rjsn = JSON.parse(fs.readFileSync("./data/film/"+req.params.film+".json"));
		res.send(playHtml({title:rjsn.title, KEY, ar:rjsn.ar, pls: `/pls/film/${req.params.film}`, parent: `/film/${req.params.film}`, back_button: "/img/back_film.svg"}));
		console.log(req.ip, "went to the", rjsn.title, `watch page`);
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});
app.get("/:programme/:series/:episode", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		req.params.programme=req.params.programme.replaceAll(/\.\.(\/|\\)/g, "");
		console.log(req.params)
		const rjsn = JSON.parse(fs.readFileSync("./data/playlist/"+req.params.programme+".json"));
		const ser = rjsn.series[req.params.series];
		if(!ser) {
			sendErr(res, `no_series`);
			return;
		}
		const ep = ser.episodes[req.params.episode];
		if(!ep) {
			sendErr(res, `no_episode`);
			return;
		}
		res.send(playHtml({title:ep.title, KEY, ar:ep.ar, pls: `/pls/${req.params.programme}/${req.params.series}/${req.params.episode}`, parent: `/${req.params.programme}/${req.params.series}`}));
		console.log(req.ip, "went to the", rjsn.title, `s${req.params.series*1+1}e${req.params.episode*1+1} page`);
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});


app.get("/", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		const prog_dir = fs.readdirSync("./data/playlist/");
		const film_dir = fs.readdirSync("./data/film/");
		
		if(!prog_dir&&!film_dir) {
			sendErr(res, `no_content`);
			return;
		}
		let programmes="";
		prog_dir.forEach((p,i)=>{
			console.log(p,i)
			const prog = JSON.parse(fs.readFileSync("./data/playlist/"+p))
			programmes+=imHtml({link: p.replace(".json", ""), image:prog.cover, title: prog.title});
		});
		const plist = stHtml({ title: "All programmes", items: programmes});

		let films="";
		film_dir.forEach((p,i)=>{
			console.log(p,i)
			const film = JSON.parse(fs.readFileSync("./data/film/"+p))
			films+=imHtml({link: "/film/"+p.replace(".json", ""), image:film.cover, title: film.title});
		});
		const flist = stHtml({ title: "All films", items: films});
		
		res.send(homeHtml({programmes:plist, films:flist, menu: muHtml, image: "/img/home-cover.jpg"}));
		console.log(req.ip, "went to the home page");
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});



app.get("/programmes", (req, res)=>{
	res.set("Content-Type", "application/json");
	try{
		const DCSLEGENDSOFTOMORROW = fs.readdirSync("./data/playlist/");
		
		if(!DCSLEGENDSOFTOMORROW) {
			sendErr(res, `no_programmes`);
			return;
		}
		let programmes=[];
		DCSLEGENDSOFTOMORROW.forEach((p,i)=>{
			console.log(p,i)
			const prog = JSON.parse(fs.readFileSync("./data/playlist/"+p))
			programmes.push({title: prog.title, url_part: "/"+p.replace(".json", "")});
		});
		console.log("programmes api call")
		res.send(JSON.stringify(programmes));
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});

app.get("/films", (req, res)=>{
	res.set("Content-Type", "application/json");
	try{
		const film_dir = fs.readdirSync("./data/film/");
		
		if(!film_dir) {
			sendErr(res, `no_programmes`);
			return;
		}
		let films=[];
		film_dir.forEach((p,i)=>{
			console.log(p,i)
			const film = JSON.parse(fs.readFileSync("./data/film/"+p))
			films.push({title: film.title, url_part: "/film/"+p.replace(".json", "")});
		});
		console.log("films api call")
		res.send(JSON.stringify(films));
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});


app.get("/:programme", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		req.params.programme=req.params.programme.replaceAll(/\.\.(\/|\\)/g, "");
		const prg=JSON.parse(fs.readFileSync("./data/playlist/"+req.params.programme+".json"));
		let series="";
		prg.series.forEach((s, i)=>{
			let eps="";
			s.episodes.forEach((e, j)=>{
				eps+=epHtml({num: j, image: e.playlist[0].image, title: e.smallTitle, series: i});
			});
			series+=srHtml({series: i, title: s.title, cover: s.cover, episodes: eps});
		});
		res.send(prHtml({title: prg.title, image: prg.cover, series, blurb: prg.blurb, menu: muHtml}));
		console.log(req.ip, "went to the", prg.title, "page");
	}
	catch(err){
		sendErr(res, err);
	}
});

app.get("/film/:film", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		req.params.film=req.params.film.replaceAll(/\.\.(\/|\\)/g, "");
		const film=JSON.parse(fs.readFileSync("./data/film/"+req.params.film+".json"));
		res.send(flHtml({title: film.title, image: film.cover, blurb: film.blurb, menu: muHtml, player: req.params.film+"/play"}));
		console.log(req.ip, "went to the", film.title, "page");
	}
	catch(err){
		sendErr(res, err);
	}
});

function sendErr(res, err) {
	if (err.toString().indexOf("force:")!=-1) res.status(err.toString().split("force:")[1]*1).send(erHtml("Force error", err.toString().split("force:")[1]*1));
	else if(err.toString().indexOf("no such file or directory")!=-1) res.status(404).send(erHtml("This programme does not exist.", 404));
	else if(err.toString().indexOf("no_programme")!=-1) res.status(404).send(erHtml("This programme does not exist.", 404));
	else if(err.toString().indexOf("no_series")!=-1) res.status(404).send(erHtml("This series does not exist.", 404));
	else if(err.toString().indexOf("no_episode")!=-1) res.status(404).send(erHtml("Hey, there are not that many episodes lol", 404));
	else res.status(500).send(erHtml(`${err}`, 500));
}


app.get("/error/:error", (req, res)=>{
	try {
		sendErr(res, "force:"+(req.params.error*1));
	}
	catch(err) {
		sendErr(res, err);
	}
});




//always at end
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname +"/public/404.html");
})
