html_parser.urls_page = {
    
    page_container_id:'urls_page',
    where_to_place_table_id:'urls_results',
    table_id:'url_search_table',
    
    has_been_built:false,
    
    show:function(){
      if(this.has_been_built == false){
          this._initial_build();
          this.has_been_built = true;
		
      }  
    },
    
    get_page_container_id:function(){
        return this.page_container_id;
    },
    
    _initial_build:function(){
        this._get_where_to_place_table().html(Mustache.render(html_parser.templates.get_template('url_table'), html_parser.urls.get_all_urls()));
    },
    
    
    _bind_table_sorter:function(){
        this._get_table().tablesorter();
    },
    
    _get_page_container:function(){
        return $('#'+this.page_container_id);
    },
    
    _get_where_to_place_table:function(){
        return $('#'+this.where_to_place_table_id);
    },
    
    _get_table:function(){
        return $('#'+this.table_id);
    }
}

