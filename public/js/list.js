$.getJSON("/programmes").done(data=>{
	const elt = document.getElementById("list");
	const lo = document.getElementById("listOverlay");
	data.forEach(show=>{
		const hr = document.createElement("hr");
		const a = document.createElement("a");
		a.href=show.url_part;
		a.innerText = show.title;
		elt.appendChild(hr);
		elt.appendChild(a);
	});
	document.getElementsByClassName("close-btn")[0].addEventListener("click", ()=>{
		lo.style.display="none";
	});
	document.getElementById("listButton").addEventListener("click", ()=>{
		lo.style.display="block";
	});
	lo.addEventListener("click", ()=>{
		lo.style.display="none";
	});
});

