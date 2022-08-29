module.exports = (vars)=>`<!DOCTYPE HTML>
<html lang="en-GB">
	<head>
		<title>${vars.title}</title>
		<link rel="stylesheet" href="/style/programme.css"/>
	</head>
	</body>
		<div id="programme-cover" style="background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url('${vars.image}')"><h1>${vars.title}</h1></div>
		${vars.series}
		
	<body>
</html>
`
