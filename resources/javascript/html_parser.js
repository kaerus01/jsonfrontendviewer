/**
* Main object in control of everything
* Every other object used in the project is namespaced from this
*/
var html_parser = {

	init:function(){
		// load the files
		this.loader.load(this._after_load);
		
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
	
	load:function(loaded_callback){
	
		this.loaded_callback = loaded_callback;
	
		this._place_load_image();
		
		this._done_loading();
		
	},
	
	_place_load_image:function(){
		$('#content_container').append('<img class="loader_image" src="'+this.image_src+'" alt="Loading"/>');
	},
	
	_done_loading:function(){
		$('.loader_image').remove();
		html_parser.loader.loaded_callback();
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
		$('#url_search_table').tablesorter();
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

 
 


