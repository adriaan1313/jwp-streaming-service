module.exports = (vars)=> `<div class="series"><h2>${title(vars.title)}</h2><hr><div class="items">${vars.items}</div></div>`;

function title(title){
	if(title)return title;
	else return "";
}