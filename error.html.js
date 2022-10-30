module.exports = (err, code)=>`<!DOCTYPE HTML>
<html lang="en-UK">
	<head>
		<meta charset="utf-8">
		<title>${code} - ${err}</title>
		<link rel="icon" href="/favicon.ico">
		<link rel="stylesheet" href="/style/error.css">
	</head>
	<body>
		<center>
			<h1>${es(code)}</h1>
			<a href="javascript:history.back();"><img src="/img/${ei(code)}.svg" alt="Go back"/></a>
			<h2>${code} - ${err}</h2>
		</center>
	</body>
</html>`

es=c=>{
	if(c==404)return "Oops, you seem to have taken a wrong turn!"
	else if(c==403)return "You can't do that!"
	else if(Math.floor(c/100)==5)return "We seem to have some server problems! (please report)"
	else return "Unknown error (please report)"
}

ei=e=>{
	if(e==404)return 404;
	else if(Math.floor(e/100)==5)return 500;
	else if(e==403)return 403;
	else return "unassigned_error_2"
}
