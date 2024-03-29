module.exports = (vars)=>`<!DOCTYPE HTML>
<html lang="en-GB">
	<head>
		<title>JWPSERV</title>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/regular.min.css">
		<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->
		<link rel="stylesheet" href="/style/programme.css"/>
		<link rel="manifest" href="/site.webmanifest">
	</head>
	</body>
		${vars.menu}
		<div id="short-cover" style="background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6), rgba(0,0,16,1)), url('${vars.image}')"></div>
		${vars.programmes||""}
		${vars.films||""}
		${vars.lives||""}
	<body>
</html>
`
