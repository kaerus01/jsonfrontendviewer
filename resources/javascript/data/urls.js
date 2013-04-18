/**
* Object in charge of setting and searching the url data
*/
html_parser.urls = {
	
        // this gets set in data.js
	data:null,
	
	/**
	* Sets the url data
	*/
	set_data:function(data){
		this.data = data;
	},
	
	/**
	* Gets the data for the general statistics results page
	*/
	get_general_stats:function(){
		return {
			starting_url: this.data.starting_url,
			domain: this.data.domain,
			total_urls: this.data.total_urls,
			total_same_domain_urls: this.data.total_same_domain_urls,
			total_misspellings: this.data.total_misspellings,
			total_same_domain_pages: this.data.total_same_domain_pages,
			total_time: this.data.total_time,
			total_images: this.data.total_images
		}
	},
	
	/**
	 *	Gets the data
	 */
	get_data:function(){
		return this.data;
	},
	
	/**
	*  Returns all of the urls
	*/
	get_all_urls:function(){
		return this.data.urls;
	},
	
	/**
	*	Returns any url that contained a misspelling
	*/
	get_all_misspellings:function(){
		var result = [];
		var urls = this.get_urls()
		for(var i in urls){
			if(urls[i].html_asset != null && urls[i].html_asset.misspellings.length > 0){
				result.push(urls[i]);
			}
		}
		return result;
	},
	
	/**
	 * Returns all urls that have a misspelling, ordered by the occurence value, high to low
	 */
	get_all_misspellings_by_occurrence:function(){
		var result = {};
		var urls = this.get_all_urls();

		// get the misspellings into an object of objects
		for(var i in urls){
			if(urls[i].html_asset != null && urls[i].html_asset.misspellings.length > 0){

				for(var j in urls[i].html_asset.misspellings){
					
					// create the object if it doesn't exist
					if(typeof result[urls[i].html_asset.misspellings[j]] === 'undefined'){
						result[urls[i].html_asset.misspellings[j]] = {
							name:urls[i].html_asset.misspellings[j],
							occurrences:1,
							urls:{}
						}
						
						result[urls[i].html_asset.misspellings[j]].urls[urls[i].url] = urls[i].url;
					}
					// add to the object if it does exist
					else{
						result[urls[i].html_asset.misspellings[j]].occurrences += 1;
						result[urls[i].html_asset.misspellings[j]].urls[urls[i].url] = urls[i].url;
					}
				}
			}
		}
		
		
		// sorting function
		var sort_function = function(obj1, obj2){
			if(obj1.occurrences > obj2.occurrences){
				return -1;
			}
			else if(obj1.occurrences < obj2.occurrences){
				return 1;
			}
			else{
				return 0;
			}
		}
		
		// make into array
		var new_result = [];
		for(var i in result){
			var url_result = [];
			for(var j in result[i].urls){
				url_result.push(result[i].urls[j]);
			}
			
			result[i].urls = url_result;
			new_result.push(result[i]);
		}
		
		// sort
		new_result.sort(sort_function);
		
		return new_result;
	}
} 
