module.exports = (vars)=>
`<!DOCTYPE HTML>
<html lang="en-GB">
	<head prefix="og: http://ogp.me/ns# video: http://ogp.me/ns/video#">
		<title>${vars.title}</title>
		<link rel="stylesheet" href="/style/player.css"/>
		<meta property="og:title" content="${vars.title}" />
		<meta property="og:url" content="${vars.canon}" />
		<meta property="og:type" content="video.${vars.subtype}" />
		<meta property="og:image" content="${vars.image}" />
		<meta property="og:video" content="${vars.video.url}" />${(()=>{console.log(vars.video.url.substr(0,5));if(vars.video.url.substr(0,5)=="https") return "\n\t\t<meta property=\"og:video:secure\" content=\""+vars.video.url+"\" />"; else return "";})()}
		<meta property="og:video:type" content="${vars.video.type}" />${ifReturn(vars.video.width, "\n\t\t<meta property=\"og:video:width\" content=\""+vars.video.width+"\" />")}${ifReturn(vars.video.height, "\n\t\t<meta property=\"og:video:height\" content=\""+vars.video.height+"\" />")}
	</head>
	<body>
		<script type="text/javascript" src="${vars.jwVer || "https://ssl.p.jwpcdn.com/player/v/8.32.0/jwplayer.js"}" ></script>
		<script type="text/javascript" id="jwKey">jwplayer.key = "${vars.KEY}";</script>
		<div id="player"></div>
		<script type="text/javascript" id="jwSetup">
			const plr=jwplayer("player").setup({
				flashplayer: "/",
				width: "100vw",
				height: "100vh",
				aspectratio: ${JSON.stringify(vars.ar)},
				playlist: ${JSON.stringify(vars.pls)},
				playbackRateControls: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
				rtmp: {
					bufferlength:5
				},
				sharing: {
					heading:"Share",
					sites: ["facebook", "twitter", "interest", "email", "tumblr", "linkedin", "reddit", "pinterest"]
				},
				cast: {},
				logo: {
					file: "${vars.back_button||"/img/back.svg"}",
					hide: true,
					position: "top-left"
				}
			});
		</script>
		<script type="text/javascript" src="/js/${vars.postJS||"post.js"}"></script>
	</body>

</html>
`;
function ifReturn(a,b){
	if(a) return b||a;
	else return "";
}