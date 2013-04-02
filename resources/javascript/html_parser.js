var html_parser = {

	parse_file_location:'',
	parsed_data:null,
	
	init:function(params){
		this.parse_file_location = params.parse_file_location;
		this.load_parse_file();
	},
	
	load_parse_file:function(){
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
	}
}

// {url:['url1','url2']}

var html_parser_search = {

	current_check:null,
	results:[],

	search:function(search_obj){
		this.results = [];
		for(var i in html_parser.parsed_data.urls){
			this._search(html_parser.parsed_data.urls[i], search_obj, 0);
		}
		return this.results;
	},
	
	_search:function(dataset, search_obj, current_depth){
		
		if(current_depth == 0){
			this.current_check = dataset
		}
		
		for(var i in dataset){
			//console.log(current_depth);
			console.log("index: "+i);
			/*console.log(dataset[i]);
			console.log(search_obj[i]);*/
			if(typeof dataset[i] !== 'undefined'){
				
				if(Object.prototype.toString.call(dataset[i]) == "[object Object]"){
					
					var result = this._search(dataset[i], search_obj[i], current_depth+1);
					if(result === true){
						break;
					}
				}
				else if(Object.prototype.toString.call(dataset[i]) === '[object Array]'){
				
				}
				/*else{
					console.log("dataset value: "+dataset[i]);
				}*/
				else if(typeof search_obj[i] !== 'undefined'){
					console.log('poop');
					var current = search_obj[i];
					if(typeof search_obj[i] === 'object'){
						for(var i in current){
							if(typeof current === 'object'){
								current = current[i];
							}
							else if(current == dataset[i]){
								this.results.push(this.current_check);
								return true;
							}
						}
					}
					else if(current == dataset[i]){
						this.results.push(this.current_check);
						return true;
					}
				}
			}
		}
		
		return false;
	}
}

html_parser_search_obj = function(){
	
	this.where = function(key, value){
		
		var parts = key.split('.');
		var current = null;
		var counter = 1;
		
		for(var i in parts){
			if(current === null && typeof this[parts[i]] == 'undefined'){
				this[parts[i]] = {};
			}
			else if(current !== null && typeof current[parts[i]] == 'undefined'){
				current[parts[i]] = {};
			}
			
			if(counter == parts.length){
				current = (current === null)?(this[parts[i]] = value):(current[parts[i]] = value);
			}
			else{
				current = (current === null)?this[parts[i]]:current[parts[i]];
			}
			counter++;
		}
	}
}

cat = new html_parser_search_obj();
cat.where('html_asset.title', 'One Page');
cat.where('content_type', 'image/png');
