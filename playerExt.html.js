module.exports = (vars)=>
`<!DOCTYPE HTML>
<html lang="en-GB">
	<head>
		<title>${vars.title}</title>
		<link rel="stylesheet" href="/style/player.css"/>
	</head>
	<body>
		<script type="text/javascript" src="${vars.jwVer || "https://ssl.p.jwpcdn.com/player/v/8.26.7/jwplayer.js"}" ></script>
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
					sites: ["facebook", "twitter", "interest", "email", "tumblr", "linkedin", "reddit"]
				},
				cast: {},
				logo: {
					file: "/img/back.svg",
					hide: true,
					position: "top-left"
				}
			});
		</script>
		<script type="text/javascript" src="/js/post.js"></script>
	</body>

</html>
`;