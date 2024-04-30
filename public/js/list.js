const lo = document.getElementById("listOverlay");
const cb = document.getElementById("close-btn");
$.getJSON("/programmes").done(data=>{
	const elt = document.getElementById("progList");
	data.forEach(show=>{
		const hr = document.createElement("hr");
		const a = document.createElement("a");
		a.href=show.url_part;
		a.innerText = show.title;
		elt.appendChild(hr);
		elt.appendChild(a);
	});
	cb.addEventListener("click", ()=>{
		lo.style.display="none";
		elt.style.display="none";
		cb.style.display="none";
	});
	document.getElementById("listButtonProg").addEventListener("click", ()=>{
		lo.style.display="block";
		elt.style.display="block";
		cb.style.display="block";
	});
	lo.addEventListener("click", ()=>{
		lo.style.display="none";
		elt.style.display="none";
		cb.style.display="none";
	});
});

$.getJSON("/films").done(data=>{
	const elt = document.getElementById("filmList");
	data.forEach(show=>{
		const hr = document.createElement("hr");
		const a = document.createElement("a");
		a.href=show.url_part;
		a.innerText = show.title;
		elt.appendChild(hr);
		elt.appendChild(a);
	});
	cb.addEventListener("click", ()=>{
		lo.style.display="none";
		elt.style.display="none";
		cb.style.display="none";
	});
	document.getElementById("listButtonFilm").addEventListener("click", ()=>{
		lo.style.display="block";
		elt.style.display="block";
		cb.style.display="block";
	});
	lo.addEventListener("click", ()=>{
		lo.style.display="none";
		elt.style.display="none";
		cb.style.display="none";
	});
});

$.getJSON("/lives").done(data=>{
	const elt = document.getElementById("liveList");
	data.forEach(show=>{
		const hr = document.createElement("hr");
		const a = document.createElement("a");
		a.href=show.url_part;
		a.innerText = show.title;
		elt.appendChild(hr);
		elt.appendChild(a);
	});
	cb.addEventListener("click", ()=>{
		lo.style.display="none";
		elt.style.display="none";
		cb.style.display="none";
	});
	document.getElementById("listButtonLive").addEventListener("click", ()=>{
		lo.style.display="block";
		elt.style.display="block";
		cb.style.display="block";
	});
	lo.addEventListener("click", ()=>{
		lo.style.display="none";
		elt.style.display="none";
		cb.style.display="none";
	});
});

