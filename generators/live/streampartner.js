class Streampartner {
	data;
	name;
	margin;
	url;
	prefTs = 0;
	waitingCallbacks = [];
	constructor(data, name, margin, url) {
		this.data = data;
		this.name = name;
		this.margin = margin;
		this.url = url;
	}
	getStreamPartnerUrl(){
		let notRes = fetch(this.url).then(res=>{
			return res.text()
		});
		notRes.then(res=>{
			const [a,b,c,d]=JSON.parse("["+res.split("}(")[1].split("))")[0].replaceAll("'", '"')+"]");
			const e = wise(a,b,c,d);
			const [f,g,h,i] = JSON.parse("["+e.split("}(")[1].split("))")[0].replaceAll("'", '"')+"]");
			const j = wise(f,g,h,i);
			const [k,l,m,n] = JSON.parse("["+j.split("}(").pop().split("))")[0].replaceAll("'", '"')+"]");
			const o = wise(k,l,m,n);
			const p = o.split(`src:"`)[1].split(`"`)[0];
			this.prefTs = 1*p.split("token_endtime=")[1].split("&")[0];
			console.log(this.name, this.data.playlist.playlist[0])
			this.data.playlist.playlist[0].sources[0].file = p;
			this.setUpToDate();
		});
	}
	refresh(d){
		if(d/1000 > this.prefTs - this.margin){
			this.data.upToDate = false;
			this.getStreamPartnerUrl();
			return;
			
		}
		return false;
	}
	setUpToDate(){
		this.data.upToDate = true;
		this.waitingCallbacks.forEach((a,i)=>{
			a(data);
			delete this.waitingCallbacks[i];//just in case
		});
		this.waitingCallbacks.length=0;
	}
	
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
module.exports= Streampartner;