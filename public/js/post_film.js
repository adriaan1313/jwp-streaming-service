plr.on("ready", ()=>{
console.log("ready")
Array.from(document.getElementsByClassName("jw-logo-top-left")).forEach((e)=>{
	e.onclick=()=>{
		let a =	new URL(location.href);
		a.pathname+="/..";
		location.href=a.href;
		console.log("aaa");
	};
	console.log("aaa");
});});