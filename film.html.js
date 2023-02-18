module.exports = (vars)=>`<!DOCTYPE HTML>
<html lang="en-GB">
	<head>
		<title>${vars.title}</title>
		<link rel="stylesheet" href="/style/programme.css"/>
	</head>
	</body>
		${vars.menu}
		<div id="film-cover" style="background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6), rgba(0,0,16,1)), url('${vars.image}')"><div><h1>${vars.title}</h1><p>${vars.blurb}</p><a href="${vars.player}" id="watchButton">Watch ${vars.title}</a></div></div>
	<body>
</html>
`