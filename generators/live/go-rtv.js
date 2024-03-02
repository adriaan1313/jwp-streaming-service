//const got = require("sync-request");
//const fetch = require("node:fetch"); oh, is built in i guess
let prefTs = 0;
const name = "RTV-GO";
const waitingCallbacks = [];
const MARGIN = 2000;
let data = {
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
};


function getStreamPartnerUrl(url, callback){
	//const res = got("GET",url);
	let notRes = fetch(url).then(res=>{
		return res.text()
	});

	notRes.then(res=>{
		//console.log(res);
		const [a,b,c,d]=JSON.parse("["+res.split("}(")[1].split("))")[0].replaceAll("'", '"')+"]");
		const e = wise(a,b,c,d);
		const [f,g,h,i] = JSON.parse("["+e.split("}(")[1].split("))")[0].replaceAll("'", '"')+"]");
		const j = wise(f,g,h,i);
		const [k,l,m,n] = JSON.parse("["+j.split("}(").pop().split("))")[0].replaceAll("'", '"')+"]");
		const o = wise(k,l,m,n);
		const p = o.split(`src:"`)[1].split(`"`)[0];

		prefTs = 1*p.split("token_endtime=")[1].split("&")[0];
		console.log(data.playlist.playlist[0])
		data.playlist.playlist[0].sources[0].file = p;
		setUpToDate();
	});
}
function wise(w, i, s, e) {
	var a = 0;
	var b = 0;
	var c = 0;
	var d = [];
	var f = [];
	while (true) {
		if (a < 5) f.push(w.charAt(a));
		else if (a < w.length) d.push(w.charAt(a));
		a++;
		if (b < 5) f.push(i.charAt(b));
		else if (b < i.length) d.push(i.charAt(b));
		b++;
		if (c < 5) f.push(s.charAt(c));
		else if (c < s.length) d.push(s.charAt(c));
		c++;
		if (w.length + i.length + s.length + e.length == d.length + f.length + e.length)	break;
	}
		var g = d.join("");
		var h = f.join("");
		b = 0;
		var j = [];
		for (a = 0; a < d.length; a += 2) {
		var k = -1;
		if (h.charCodeAt(b) % 2) k = 1;
		j.push(String.fromCharCode(parseInt(g.substr(a, 2), 36) - k));
		b++;
		if (b >= f.length) b = 0;
	}
	return j.join("");
}

function refresh(d){
	if(d/1000 > prefTs - MARGIN){
		data.upToDate = false;
		getStreamPartnerUrl("https://ssl.streampartner.nl/player.php?url=c9616ec317ffd9d6d6e1");
		return;
		
	}
	return false;
}

function setUpToDate(){
	data.upToDate = true;
	waitingCallbacks.forEach((a,i)=>{
		a(data);
		delete waitingCallbacks[i];//just in case
	});
	waitingCallbacks.length=0;
}

module.exports= {data, refresh, waitingCallbacks};