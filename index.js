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

const storage=new (require("./storage"))("./data/");
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
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, listening);
function listening(){
	//storage.add("live/gortv",require("./generators/live/go-rtv2"));
	console.log("listening. . .");
}

app.use(express.static('public'));
app.get("/pls/film/:film/", (req, res)=>{
	res.set("Content-Type", "application/json")
	try{
		req.params.film=req.params.film.replaceAll(/\.\.(\/|\\)/g, "");
		const rjsn = storage.find("film/"+req.params.film);
		res.send(rjsn.playlist);
	}
	catch(err){
		if(err.toString().indexOf("no such file or directory")!=-1)res.status(404).send(`{"error": "no_programme"}`);
		else res.status(500).send(`{"error": "${err}"}`);
	}
});
app.get("/pls/live/:live/", (req, res)=>{
	res.set("Content-Type", "application/json")
	try{
		req.params.live=req.params.live.replaceAll(/\.\.(\/|\\)/g, "");
		storage.findAsync("live/"+req.params.live, rjsn=>{
			res.send(rjsn.playlist);
		});
	}
	catch(err){
		if(err.toString().indexOf("no such file or directory")!=-1)res.status(404).send(`{"error": "no_programme"}`);
		else res.status(500).send(`{"error": "${err}"}`);
	}
});
app.get("/pls/live/:series/:channel", (req, res)=>{
	res.set("Content-Type", "application/json")
	try{
		req.params.series=req.params.series.replaceAll(/\.\.(\/|\\)/g, "");
		const rjsn = storage.find("multilive/"+req.params.series);
		const ep = rjsn.channels[req.params.channel];
		if(!ep) {
			res.status(404).send(`{"error": "Hey, that channel does not exist lol"}`);
			return;
		}
		res.send(ep);
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
		const rjsn = storage.find("playlist/"+req.params.programme);
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
		const rpfilm=req.params.film.replaceAll(/\.\.(\/|\\)/g, "");
		console.log(req.params)
		const rjsn = storage.find("film/"+rpfilm);
		res.send(playHtml({title:rjsn.title, KEY, ar:rjsn.ar, pls: `/pls/film/${rpfilm}`, parent: `/film/${rpfilm}`, back_button: "/img/back_film.svg", postJS: "post_film.js", canon: getCanonUrl(req), subtype: "movie", image: rjsn.cover, video: {url: rjsn.playlist.playlist[0].sources[0].file, type: rjsn.playlist.playlist[0].sources[0].type, width: rjsn.playlist.playlist[0].sources[0].width, height: rjsn.playlist.playlist[0].sources[0].height}, description: rjsn.blurb }));
		console.log(req.ip, "went to the", rjsn.title, `watch page`);
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});

app.get("/live/:live/play", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		const rplive=req.params.live.replaceAll(/\.\.(\/|\\)/g, "");
		console.log(req.params)
		const rjsn = storage.find("live/"+rplive);
		res.send(playHtml({title:rjsn.title, KEY, ar:rjsn.ar, pls: `/pls/live/${rplive}`, parent: `/live/${rplive}`, back_button: "/img/back_film.svg", postJS: "post_film.js", canon: getCanonUrl(req), subtype: "other", image: rjsn.cover, video: {url: rjsn.playlist.playlist[0].sources[0].file, type: rjsn.playlist.playlist[0].sources[0].type, width: rjsn.playlist.playlist[0].sources[0].width, height: rjsn.playlist.playlist[0].sources[0].height}, description: rjsn.blurb }));
		console.log(req.ip, "went to the", rjsn.title, `watch page`);
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});

app.get("/live/:series/:channel", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		const rpseries=req.params.series.replaceAll(/\.\.(\/|\\)/g, "");
		const rpchannel=req.params.channel.replaceAll(/\.\.(\/|\\)/g, "");
		console.log(req.params)
		const rjsn = storage.find("multilive/"+rpseries);
		const ch = rjsn.channels[rpchannel];
		if(!ch) {
			sendErr(res, `no_channel`);
			return;
		}
		res.send(playHtml({title:ch.title, KEY, ar:ch.ar, pls: `/pls/live/${rpseries}/${rpchannel}`, parent: `/live/${rpseries}`, postJS: "post_film.js", canon: getCanonUrl(req), subtype: "other", image: rjsn.cover, video: {url: ch.playlist[0].sources[0].file, type: ch.playlist[0].sources[0].type, width: ch.playlist[0].sources[0].width, height: ch.playlist[0].sources[0].height }, description: ch.description}));
		console.log(req.ip, "went to the", `s${rpseries}e${rpchannel} page`);
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});




app.get("/:programme/:series/:episode", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		const rpprogramme=req.params.programme.replaceAll(/\.\.(\/|\\)/g, "");
		const rpseries=Number(req.params.series);
		const rpepisode=Number(req.params.episode);
		console.log(req.params)
		const rjsn = storage.find("playlist/"+rpprogramme);
		const ser = rjsn.series[rpseries];
		if(!ser) {
			sendErr(res, `no_series`);
			return;
		}
		const ep = ser.episodes[rpepisode];
		if(!ep) {
			sendErr(res, `no_episode`);
			return;
		}
		res.send(playHtml({title:ep.title, KEY, ar:ep.ar, pls: `/pls/${rpprogramme}/${rpseries}/${rpepisode}`, parent: `/${rpprogramme}/${rpseries}`, canon: getCanonUrl(req), subtype: "episode", image: rjsn.cover, video: {url: ep.playlist[0].sources[0].file, type: ep.playlist[0].sources[0].trueType||ep.playlist[0].sources[0].type, width: ep.playlist[0].sources[0].width, height: ep.playlist[0].sources[0].height}, description: ep.description})); // This is getting out of hand, we should probably just hand it all the json at some point
		console.log(req.ip, "went to the", rjsn.title, `s${rpseries*1+1}e${rpepisode*1+1} page`);
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
		const live_dir = fs.readdirSync("./data/live/");
		const mlive_dir = fs.readdirSync("./data/multilive/");
		
		if(!prog_dir&&!film_dir) {
			sendErr(res, `no_content`);
			return;
		}
		let programmes="";
		prog_dir.forEach(p=>{
			const prog = storage.find("playlist/"+p.slice(0,-5));
			programmes+=imHtml({link: p.slice(0,-5), image:prog.cover, title: prog.title});
		});
		storage.genList("playlist/").forEach(p=>{
			lp=storage.find(p);
			programmes+=imHtml({link: p, image:lp.cover, title: lp.title});
		});
		const plist = stHtml({ title: "All programmes", items: programmes});

		let films="";
		film_dir.forEach(p=>{
			const film = storage.find("film/"+p.slice(0,-5));
			films+=imHtml({link: "/film/"+p.slice(0,-5), image:film.cover, title: film.title});
		});
		storage.genList("film/").forEach(p=>{
			lp=storage.find(p);
			films+=imHtml({link: p, image:lp.cover, title: lp.title});
		});
		const flist = stHtml({ title: "All films", items: films});
		
		let lives="";
		live_dir.forEach(p=>{
			const live = storage.find("live/"+p.slice(0,-5));
			lives+=imHtml({link: "/live/"+p.slice(0,-5), image:live.cover, title: live.title});
		});
		storage.genList("live/").forEach(p=>{
			lp=storage.find(p);
			lives+=imHtml({link: p, image:lp.cover, title: lp.title});
		});
		mlive_dir.forEach(p=>{
			const live = storage.find("multilive/"+p.slice(0,-5));
			lives+=imHtml({link: "/live/"+p.slice(0,-5), image:live.cover, title: live.title});
		});
		storage.genList("multilive/").forEach(p=>{
			lp=storage.find(p);
			lives+=imHtml({link: p, image:lp.cover, title: lp.title});
		});
		const llist = stHtml({ title: "All live", items: lives});
		
		res.send(homeHtml({programmes:plist, lives:llist, films:flist, menu: muHtml, image: "/img/home-cover.jpg"}));
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
		DCSLEGENDSOFTOMORROW.forEach(p=>{
			const prog = storage.find("playlist/"+p.slice(0,-5));
			programmes.push({title: prog.title, url_part: "/"+p.slice(0,-5)});
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
		film_dir.forEach(p=>{
			const film = storage.find("film/"+p.slice(0,-5));
			films.push({title: film.title, url_part: "/film/"+p.slice(0,-5)});
		});
		console.log("films api call")
		res.send(JSON.stringify(films));
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});

app.get("/lives", (req, res)=>{
	res.set("Content-Type", "application/json");
	try{
		const live_dir = fs.readdirSync("./data/live/");
		const mlive_dir = fs.readdirSync("./data/multilive/");
		
		if(!live_dir&&!mlive_dir) {
			sendErr(res, `no_programmes`);
			return;
		}
		let lives=[];
		live_dir.forEach(p=>{
			const live = storage.find("live/"+p.slice(0,-5));
			lives.push({title: live.title, url_part: "/live/"+p.slice(0,-5)});
		});
		mlive_dir.forEach(p=>{
			const live = storage.find("multilive/"+p.slice(0,-5));
			lives.push({title: live.title, url_part: "/live/"+p.slice(0,-5)});
		});
		console.log("lives api call")
		res.send(JSON.stringify(lives));
	}
	catch(err){
		console.log(err);
		sendErr(res, err);
	}
});


app.get("/:programme", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		const rpprogramme=req.params.programme.replaceAll(/\.\.(\/|\\)/g, "");
		
		const prg=storage.find("playlist/"+rpprogramme);
		let series="";
		prg.series.forEach((s, i)=>{
			let eps="";
			s.episodes.forEach((e, j)=>{
				eps+=epHtml({num: j, image: e.playlist[0].image, title: e.smallTitle, series: i, programme: rpprogramme});
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
		const film=storage.find("film/"+req.params.film);
		res.send(flHtml({title: film.title, image: film.cover, blurb: film.blurb, menu: muHtml, player: ("/film/"+req.params.film+"/play").replaceAll("//", "/")}));
		console.log(req.ip, "went to the", film.title, "page");
	}
	catch(err){
		sendErr(res, err);
	}
});

app.get("/live/:live", (req, res)=>{
	res.set("Content-Type", "text/html");
	try{
		req.params.live=req.params.live.replaceAll(/\.\.(\/|\\)/g, "");
		if(fs.readdirSync("./data/live").indexOf(req.params.live+".json")!=-1||Object.keys(storage.cache).includes("live/"+req.params.live)){
			
			const live=storage.find("live/"+req.params.live);
			res.send(flHtml({title: live.title, image: live.cover, blurb: live.blurb, menu: muHtml, player: ("/live/"+req.params.live+"/play").replaceAll("//", "/")}));
			console.log(req.ip, "went to the", live.title, "page");
		}else {
			const prg=storage.find("multilive/"+req.params.live);
			let series="";
			
			Object.keys(prg.channels).forEach((c)=>{
				series+=imHtml({image: prg.channels[c].playlist[0].image, title: prg.channels[c].smallTitle, link: `/live/${req.params.live}/${c}`});
			});
	
			res.send(prHtml({title: prg.title, image: prg.cover, series, blurb: prg.blurb, menu: muHtml}));
			console.log(req.ip, "went to the", prg.title, "page");
		}
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

function getCanonUrl(req) {
	console.log(req.get("host"))
	return `https://${req.get("host")}${req.baseUrl}${req.path}`;//always https, because we don't want duplicates. the host header, because we're running on like some aws thing or something
}


