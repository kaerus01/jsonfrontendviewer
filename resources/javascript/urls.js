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
			total_urls: this.data.total_urls,
			total_same_domain_urls: this.data.total_same_domain_urls,
			total_misspellings: this.data.total_misspellings,
			total_same_domain_pages: this.data.total_same_domain_pages,
			total_time: this.data.total_time,
			total_images: this.data.total_images
		}
	},
	
	/**
	*  Returns all of the urls
	*/
	get_all_urls:function(){
		return this.data;
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
	}
} 