plr.on("ready", ()=>{
console.log("ready")
Array.from(document.getElementsByClassName("jw-logo-top-left")).forEach((e)=>{
	e.onclick=()=>{
		location.href=location.href.replace(/(\/[0-9]+\/[0-9]+\/)|(\/[0-9]+\/[0-9]+)/, "");
		console.log("aaa");
	};
	console.log("aaa");
});});