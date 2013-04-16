html_parser.misspellings_page = {
    
    page_container_id:'misspellings_page',
    have_been_built:false,
    
    show:function(){
        if(this.have_been_built == false){
            this._build();
            this.have_been_built = true;
        }
    },
	
	get_page_container_id:function(){
        return this.page_container_id;
    },
	
	_build:function(){	
		var res = {};
		res.result = html_parser.urls.get_all_misspellings_by_occurrence();
		this._get_container().html(Mustache.render(html_parser.templates.get_template('misspelling_items'), res));
		console.log(res.result);
		console.log(Mustache.render(html_parser.templates.get_template('misspelling_items'), res));
	},
	
	_get_container:function(){
        return $('#'+this.page_container_id);
    }
	
}
	
