const fs = require("node:fs");
const path = require("node:path");


//https://gist.github.com/kethinov/6658166, i know, i'm lazy, but eh, idc
/*function walkSync(dir, filelist) {
	const files = fs.readdirSync(dir);
	filelist = filelist || [];
	files.forEach(file => {
		if (fs.statSync(dir + file).isDirectory()) {
			filelist = walkSync(dir + file + '/', filelist);
		}
		else {
			filelist.push(file);
		}
	});
	return filelist;
}; turns out it wasn't needed anyways*/






class DataBoi {
	constructor(dataPath){
		this.path = dataPath;
		this.cache = {};
	}
	find(dataPath){
		if(this.cache[dataPath]?.type == "generated"){
			const response = this.cache[dataPath].refresh(Date.now());
			if(response!==false){
				this.cache[dataPath].data = response;
			}
		}else {
		const fullPath = path.join(this.path, dataPath)+".json";
			if(!(this.cache[dataPath] && this.cache[dataPath].date >= fs.statSync(fullPath).mtimeMs)){
				delete this.cache[dataPath];
				this.cache[dataPath]={
					data: JSON.parse(fs.readFileSync(fullPath)),
					date: Date.now(),
					type: "file"
				};
			}
		}
		return this.cache[dataPath].data;
	}
	add(dataPath, data, refresh){
		data||=refresh(1);
		console.log(data);
		this.cache[dataPath] = {data, refresh, type: "generated", dataPath};
	}
	genList(prefix){
		return Object.keys(this.cache).filter((key,i,a)=>{
			return this.cache[key].type=="generated" && key.substr(0,prefix.length)==prefix;
		});
	}
	
}
function gato(){};

module.exports = DataBoi;