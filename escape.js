module.exports=(s)=>{
	var h="", i, n=s.length, c;
	for(i=0;i<n;i++){
		h+='&#'+s.charCodeAt(i)+';'; // literally do everything, even normal text
	}
	return h;
}
//https://stackoverflow.com/a/34481254/8471553