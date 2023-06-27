$.getJSON("/programmes").done(data=>{
	const elt = document.getElementById("progList");
	const lo = document.getElementById("listProg");
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
	document.getElementById("listButtonProg").addEventListener("click", ()=>{
		lo.style.display="block";
	});
	lo.addEventListener("click", ()=>{
		lo.style.display="none";
	});
});

$.getJSON("/films").done(data=>{
	const elt = document.getElementById("filmList");
	const lo = document.getElementById("listFilm");
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
	document.getElementById("listButtonFilm").addEventListener("click", ()=>{
		lo.style.display="block";
	});
	lo.addEventListener("click", ()=>{
		lo.style.display="none";
	});
});

$.getJSON("/lives").done(data=>{
	const elt = document.getElementById("liveList");
	const lo = document.getElementById("listLive");
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
	document.getElementById("listButtonLive").addEventListener("click", ()=>{
		lo.style.display="block";
	});
	lo.addEventListener("click", ()=>{
		lo.style.display="none";
	});
});

