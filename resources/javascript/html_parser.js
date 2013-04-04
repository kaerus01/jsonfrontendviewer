/**
* Main object in control of everything
* Every other object used in the project is namespaced from this
*/
var html_parser = {

	init:function(params){
		// load the files
		this.loader.load(params.parse_file_location, this._after_load);
		
	},
	
	_after_load:function(){
		html_parser.control_panel.init();
	}
	
	
}



/**
*  Object in control of getting all the data loaded
*/
html_parser.loader = {
	loaded_callback:function(){},
	image_src:'resources/images/ajax-loader.gif',
	parse_file_location:'',
	
	load:function(parse_file_location, loaded_callback){
	
		this.loaded_callback = loaded_callback;
	
		this._place_load_image();
		
		this.parse_file_location = parse_file_location;
		
		this._load_parse_file();
		
		this._load_templates();
		
	},
	
	_place_load_image:function(){
		$('#content_container').prepend('<img class="loader_image" src="'+this.image_src+'" alt="Loading"/>');
	},
	
	_load_parse_file:function(){
		$.ajax({
		  url: this.parse_file_location,
		  dataType:'json',
		}).done(function( data ) {
			html_parser.urls.set_data(data);
		}).fail(function(jqXHR, text_status){
			alert("Could not read in text file: "+text_status);
			console.log(text_status);
		});
	},
	
	_load_templates:function(){
		html_parser.templates.get_templates(this._done_loading);
	},
	
	_done_loading:function(){
		$('.loader_image').remove();
		html_parser.loader.loaded_callback();
	}
	
}

/**
* Object in charge of managing templates
*/
html_parser.templates = {

	loaded_count:0,
	
	/**
	* Templates to be loaded
	* To add another, simply add another variable to the temps object.  The variable name should be the name of the template file in resources/templates
	*/
	temps:{
		control_panel:'',
		general_statistics:'',
		url_table:''
	},
	
	/**
	* Gets a template based off the templates name
	*/
	get_template:function(which){
		return this.temps[which];
	},
	
	get_templates:function(callback){
		for(var template_name in this.temps){
			this._load_template(template_name, callback);
		}
	},
	
	_load_template:function(template_name, callback){
		var self = this;
		$.get('resources/templates/'+template_name, function(data) {
				self._template_loaded(template_name, data, callback);
		});
	},
	
	_template_loaded:function(template_name, data, callback){
	
		this.temps[template_name] = data;
		this.loaded_count++;
		
		var size = 0;
		for(var i in this.temps){size++;}
		
		if(size == this.loaded_count){
			callback();
		}
	}
}

/**
*	Object in charge of managing the control panel
*/
html_parser.control_panel = {

	// the result page that gets shown on load
	default_page:'general_stats',
	
	init:function(){
		this._build();
		this._bind();
	},
	
	_build:function(){
		$('#control_panel').html(html_parser.templates.get_template('control_panel'));
		
		if(this.default_page == 'general_stats'){
			html_parser.html_results.show_general_stats();
		}
	},
	
	_bind:function(){
		$('#general_stats_button').click(function(){
			html_parser.html_results.show_general_stats();
		});
		$('#urls_button').click(function(){
			html_parser.html_results.show_urls();
		});
		
		
	}
}

/**
*	Object in charge of handling the results portion
*/
html_parser.html_results = {

	are_general_stats_built:false,
	
	
	// show the general stats page
	show_general_stats:function(){
	
		// lazy load since stats should not change
		if(this.are_general_stats_built == false){
			this._build_general_stats();
			
			this.are_general_stats_built = true;
		}
		
		this._transition('general_statistics');
	},
	
	// show the urls page
	show_urls:function(){
		this._build_urls();
		this._transition('urls');
	},
	
	_build_urls:function(){
		$('#urls_results').html(Mustache.render(html_parser.templates.get_template('url_table'), html_parser.urls.get_all_urls()));
	},
	
	_build_general_stats:function(){
		$('#general_statistics').html(Mustache.render(html_parser.templates.get_template('general_statistics'), html_parser.urls.get_general_stats()));
	},
	
	
	// hide every results page except for the one that corresponds to the button clicked
	_transition:function(id_of_one_to_be_shown){
	
		$.each($('.result_container'), function(index, value){
			value = $(value);
			if(value.attr('id') == id_of_one_to_be_shown){
				value.show();
			}
			else{
				value.hide();
			}
		});
	}
	
}

 
 
/**
* Object in charge of setting and searching the url data
*/
html_parser.urls = {
	
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
			total_pages: this.data.total_pages,
			total_time: this.data.total_time
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

