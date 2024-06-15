
let prevTs = 0;
const name = "Tweede Kamer";
const waitingCallbacks = [];
const EXPIRE_AFTER = 60*60*12;//elke 12 uur, gewoon een mooi rond getal
let data = {
	"title": "Tweede Kamer",
	"cover": "https://cdn.debatdirect.tweedekamer.nl/static/img/blauwe-stoelen.jpg",
	"blurb": "Tweede Kamer live",
	"channels":{}
}

//Wel jammer dat er locations zijn waar die dezelfde stream hebben.
function update(){
	fetch("https://cdn.debatdirect.tweedekamer.nl/api/app").then(res=>{
		return res.json()
	}).then(d=>{
		Object.keys(data.channels).forEach(a=>{delete data.channels[a];});
		for(let i = 0; i < d.locations.length; i++){
			if(d.locations[i].slug != d.locations[i].id) console.log(`Slug ${d.locations[i].slug} is niet gelijk aan id ${d.locations[i].id}!`);
			data.channels[d.locations[i].slug] = {
				"smallTitle": d.locations[i].name,
				"title": "Tweede Kamer: "+d.locations[i].name,
				"description": d.locations[i].description,
				"kind": "Single Item",
				"ar": "16:9", 
				"playlist": [{
					"title": "Tweede Kamer: "+d.locations[i].name,
					"image": d.locations[i].imageUrl,
					"minDvrWindow": 0,
					"images":[
						{"src":d.locations[i].imageUrl}
					],
					"sources":[
						{"file":stringInfiller(d.locations[i].streamUrl, [["slug", d.locations[i].slug]]),"type":"application/vnd.apple.mpegurl"},
						{"file":stringInfiller(d.locations[i].vodUrl, [["slug", d.locations[i].slug]]),"type":"application/vnd.apple.mpegurl"},
						{"file":stringInfiller(d.locations[i].audioUrl, [["slug", d.locations[i].slug]]),"type":"application/vnd.apple.mpegurl"}
					]
				}]
			}
		}
		setUpToDate();
		
	});
}


function refresh(d){
	if(d/1000 > prevTs + EXPIRE_AFTER){
		data.upToDate = false;
		update();
		return;
		
	}
	return false;
}
const STD = [["date", "live"]];
function stringInfiller(string, data){
	data = data || [];
	data.forEach((thing)=>{
		string = string.replaceAll("{"+thing[0]+"}", thing[1]);
	})
	STD.forEach((thing)=>{
		string = string.replaceAll("{"+thing[0]+"}", thing[1]);
	})
	return string;
}

function setUpToDate(){
	prevTs = Date.now()/1000;
	data.upToDate = true;
	waitingCallbacks.forEach((a,i)=>{
		a(data);
		delete waitingCallbacks[i];//just in case
	});
	waitingCallbacks.length=0;
}

module.exports= {data, refresh, waitingCallbacks};