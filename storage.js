/**
 * Storage
 * @module storage
 */
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
	/**
	 * @param {string} dataPath - The path of directory with "static" json files.
	 */
	constructor(dataPath){
		this.path = dataPath;
		this.cache = {};
	}
	/**
	 * @param {string} dataPath - The path of the requested object.
	 * @return {Object} The requested data, as a js object. If none found, something throws.
	 */
	find(dataPath){
		if(this.cache[dataPath]?.type == "generated"){
			const response = this.cache[dataPath].refresh(Date.now());
			if(response!==false){
				console.log(`${dataPath} refreshed`);
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
	/**
	 * @param {string} dataPath - The path of the requested object.
	 * @param {function(Object)} callback - Callback, called with object as only argument when found. 
	 */
	findAsync(dataPath, callback){
		if(this.cache[dataPath]?.type == "generated"){
			const response = this.cache[dataPath].refresh(Date.now());
			if(response===false && this.cache[dataPath].data.upToDate){
				callback(this.cache[dataPath].data);
			}else {
				console.log(`${dataPath} started refreshing`);
				this.cache[dataPath].waitingCallbacks.push(callback);//note: this assumes this isn't run *during* setUpToDate
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
			callback(this.cache[dataPath].data);
		}
	}
	/**
	 * @param {string} dataPath - The path where the object should be added.
	 * @param {dataobj} dataobj - a data object, which has a .type. 
	 */
	add(dataPath, dataobj){
		//like dataobj = {data:whateve, refresh:fn(date)}
		dataobj.data||=dataobj.refresh(1);
		console.log(dataobj.data);
		dataobj.type = "generated";
		dataobj.dataPath = dataPath;
		this.cache[dataPath] = dataobj;
		return dataobj;
	}
	
	/**
	 * @param {string} prefix
	 * @returns {Array.<string>} 
	 */
	genList(prefix){
		return Object.keys(this.cache).filter((key,i,a)=>{
			return this.cache[key].type=="generated" && key.substr(0,prefix.length)==prefix;
		});
	}
	
}
function gato(){};

/**
 * @typedef {Object} dataobj
 * @property {Object} [data] - any arbitry data, as js object.
 * @property {refreshFunction} [refresh] - function to refresh the current data
 * @property {("generated"|undefined)} [type] - a thing that means that it is either generated or a file.
 * @dataPath {string} - path of data.
*/

/**
 * @typedef {function(int):Object} refreshFunction
 * @param  {int} date - (current) date/time value. 
*/


module.exports = DataBoi;