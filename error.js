module.exports = (err)=>`<!DOCTYPE HTML>
<html lang="en-UK">
	<head>
		<meta charset="utf-8">
		<title>400 - Source not found</title>
		<link rel="icon" href="/favicon.ico">
		<link rel="stylesheet" href="/style/404.css">
	</head>
	<body>
		<center>
			<h1>Oops, you seem to have taken a wrong turn!</h1>
			<a href="javascript:history.back();"><img src="/img/404.svg" alt="Go back"/></a>
			<h2>${err}</h2>
		</center>
	</body>
</html>`