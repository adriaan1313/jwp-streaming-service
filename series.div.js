module.exports = (vars)=> `<div class="series"><h2>Series ${vars.series+1}${title(vars.title)}</h2><hr><div class="eps"><img src="${vars.cover}" class="series-img" />${vars.episodes}</div></div>`;

function title(title){
	if(title)return ": "+title;
	else return "";
}