const got = require("sync-request");
let prefTs = 0;
const name = "RTV-GO";
function getStreamPartnerUrl(url, callback){
	const res = got("GET",url);
	console.log(res);
	const [a,b,c,d]=JSON.parse("["+res.getBody("utf8" ).split("}(")[1].split("))")[0].replaceAll("'", '"')+"]");
	const e = wise(a,b,c,d);
	const [f,g,h,i] = JSON.parse("["+e.split("}(")[1].split("))")[0].replaceAll("'", '"')+"]");
	const j = wise(f,g,h,i);
	const [k,l,m,n] = JSON.parse("["+j.split("}(").pop().split("))")[0].replaceAll("'", '"')+"]");
	const o = wise(k,l,m,n);
	const p = o.split(`src:"`)[1].split(`"`)[0];
	console.log(p);
	return p;
}
function wise(w, i, s, e) {
	var lIll = 0;
	var ll1I = 0;
	var Il1l = 0;
	var ll1l = [];
	var l1lI = [];
	while (true) {
		if (lIll < 5) l1lI.push(w.charAt(lIll));
		else if (lIll < w.length) ll1l.push(w.charAt(lIll));
		lIll++;
		if (ll1I < 5) l1lI.push(i.charAt(ll1I));
		else if (ll1I < i.length) ll1l.push(i.charAt(ll1I));
		ll1I++;
		if (Il1l < 5) l1lI.push(s.charAt(Il1l));
		else if (Il1l < s.length) ll1l.push(s.charAt(Il1l));
		Il1l++;
		if (w.length + i.length + s.length + e.length == ll1l.length + l1lI.length + e.length)	break;
	}
		var lI1l = ll1l.join("");
		var I1lI = l1lI.join("");
		ll1I = 0;
		var l1ll = [];
		for (lIll = 0; lIll < ll1l.length; lIll += 2) {
		var ll11 = -1;
		if (I1lI.charCodeAt(ll1I) % 2) ll11 = 1;
		l1ll.push(String.fromCharCode(parseInt(lI1l.substr(lIll, 2), 36) - ll11));
		ll1I++;
		if (ll1I >= l1lI.length) ll1I = 0;
	}
	return l1ll.join("");
}

function refresh(d){
	if(d/1000 > prefTs){
		newUrl= getStreamPartnerUrl("https://ssl.streampartner.nl/player.php?url=c9616ec317ffd9d6d6e1");
			
		prefTs = 1*newUrl.split("token_endtime=")[1].split("&")[0];

		return {
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
							{"src":"https://www.go-rtv.nl/template/assets/img/logo.png","width":1920,"type":"image/png"}
						],
						"pubdate":0,
						"sources":[
							{"file":newUrl,"type":"application/vnd.apple.mpegurl"}
							
						],
						"tracks":[{"file":"","kind":"thumbnails"}]
					}
				]
			}
		}
		
	}
	return false;
}
module.exports= refresh;