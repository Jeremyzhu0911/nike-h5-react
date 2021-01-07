const localStore = {
	getItem:(key)=>{
		let value
		try{
			value = localStorage.getItem(key)
		}catch(err){
			console.log(err.message);
		}
		return value
	},
	setItem:(key,value)=>{
		try{
			localStorage.setItem(key,value)
		}catch(err){
			console.log(err.message);
		}
	}
}
export default localStore;