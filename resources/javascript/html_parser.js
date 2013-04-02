/**
* Main object in control of everything
* Every other object used in the project is namespaced from this
*/
var html_parser = {

	parse_file_location:'',
	parsed_data:null,
	
	init:function(params){
		this.parse_file_location = params.parse_file_location;
		
		this._load_parse_file();
		
		this._load_templates();
		
	},
	
	_build_initial:function(){
		html_parser.control_panel.init();
	},
	
	_load_parse_file:function(){
		var self = this;
		$.ajax({
		  url: this.parse_file_location,
		  dataType:'json',
		}).done(function( data ) {
			self.parsed_data = data;
		}).fail(function(jqXHR, text_status){
			alert("Could not read in text file: "+text_status);
			console.log(text_status);
		});
	},
	
	_load_templates:function(){
		html_parser.templates.get_templates(this._build_initial);
	},
}

html_parser:loader{
	have this do the loading and the gif for loading
}


/**
*	Object in charge of managing the control panel
*/
html_parser.control_panel = {
	init:function(){
		
	},
	
	build:(){
		have this build out the control panel
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
		control_panel_skeleton:'',
		control_panel_general_stats:''
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
* Object in charge of searching data
*/
html_parser.search = {
	
	/**
	*	Returns all the urls from the parsed data
	*/
	get_urls:function(){
		return html_parser.parsed_data.urls;
	},
	
	/**
	*	Returns any url that contained a misspelling
	*/
	get_all_misspellings:function(){
		var result = [];
		var urls = this.get_urls()
		for(var i in urls){
			console.log(urls[i]);
			if(urls[i].html_asset != null && urls[i].html_asset.misspellings.length > 0){
				result.push(urls[i]);
			}
		}
		return result;
	}
}