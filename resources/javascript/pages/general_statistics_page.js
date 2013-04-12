html_parser.general_statistics_page = {
    
    page_container_id:'general_statistics_page',
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
            this._get_container().html(Mustache.render(html_parser.templates.get_template('general_statistics'), html_parser.urls.get_general_stats()));
    },
    
    _get_container:function(){
        return $('#'+this.page_container_id);
    }
    
}


