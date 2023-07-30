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
		const fullPath = path.join(this.path, dataPath)+".json";
		if(!(this.cache[dataPath] && this.cache[dataPath].date >= fs.statSync(fullPath).mtimeMs)){
			delete this.cache[dataPath];
			this.cache[dataPath]={
				data: JSON.parse(fs.readFileSync(fullPath)),
				date: Date.now()
			};
		}
		return this.cache[dataPath].data;
	}
}


module.exports = DataBoi;