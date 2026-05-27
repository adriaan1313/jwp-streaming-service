let expire = 0;
const name = "Zee";
const waitingCallbacks = [];
const EXPIRE_AFTER = 60*60*12;//elke 12 uur, gewoon een mooi rond getal
let data = {
	"title": "Zee",
	"cover": "https://zeemedia.in/_next/static/media/logo.ea17160f.svg",
	"blurb": "Zee live",
	"channels":{}
}

const CHANNELS = [
	{slug: "183", name: "Zee News (Hindi)"},
	{slug: "zee_tamil", name: "Zee News (Tamil)"},
	{slug: "zee_malayalam", name: "Zee News (Malayalam)"},
	{slug: "zee_telugu", name: "Zee News (Telugu)"},
	{slug: "zee_kannada", name: "Zee News (Kannada)"},
	//{slug: "183_english", name: "Zee News"},
	{slug: "zee_wion", name: "WION (English)"},
	{slug: "zee_business", name: "Zeebiz (Hindi)"},
	{slug: "zee_hindustan", name: "Zee Bharat/Hindustan (Hindi)"},
	{slug: "zee_salaam", name: "Salaam TV (Urdu)"},
	{slug: "zee_24ghanta", name: "Zee 24Ghanta (Bengali)"},
	{slug: "zee_24kalak", name: "Zee 24Kalak (Gujarati)"},
	{slug: "zee_24taas", name: "Zee 24Taas (Marathi)"},
	{slug: "zee_kalinga", name: "Zee Kalinga/Odisha (Odia)"},
	{slug: "zee_bihar", name: "Zee Bihar Jharkhand (Hindi)"},
	{slug: "zee_delhi", name: "Zee Delhi NCR Haryana (Hindi)"},
	{slug: "zee_mp", name: "Zee Madhya pradesh Chhattisgarh (Hindi)"},
	{slug: "zee_rajasthan", name: "Zee Rajasthan (Hindi)"},
	{slug: "zee_up", name: "Zee Uttar pradesh Uttarakhand (Hindi)"},
	{slug: "zee_punjab", name: "Zee Punjab Haryana Himachal (Hindi)"}
];

const keyUrlMap = new Map();
init();
async function init(){
	//Object.keys(data.channels).forEach(a=>{delete data.channels[a];});
	for(const channel of CHANNELS){
		const cData = await (await fetch(`https://s3.ap-southeast-1.amazonaws.com/vidgyor.com/player/account/zee/conf/${channel.slug}.json`)).json();
		data.channels[channel.slug] = {
			smallTitle: channel.name.split("Zee ").pop(),
			title: channel.name,
			description: channel.name + " live",
			kind: "Single Item",
			ar: "16:9",
			playlist: [{
				title: channel.name,
				image: cData.stream.posterImageUrl,
				images: [{src:cData.stream.posterImageUrl}],
				sources: [{file: "", type: "application/vnd.apple.mpegurl", "_file": cData.stream.liveStreamUrl}]
			}]
		};
		keyUrlMap.set(channel.slug, cData.auth.url);
	}
	await update();
}

async function update(){
	const keyUrls = new Set([...keyUrlMap.values()]);
	expire = Infinity;
	for(const url of keyUrls){
		const {video_token} = (await (await fetch(url)).json());
		for(const [slug, keyUrl] of keyUrlMap){
			if(url == keyUrl) data.channels[slug].playlist[0].sources[0].file = data.channels[slug].playlist[0].sources[0]._file + video_token;
		}
		expire = Math.min(expire, atob(video_token.split('.')[1]).exp);
	}
	
	setUpToDate();
}

function refresh(d){
	if(d/1000 > expire){
		data.upToDate = false;
		update();
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
