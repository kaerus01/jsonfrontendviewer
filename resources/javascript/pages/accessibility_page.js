html_parser.accessibility_page = {
    
    page_container_id:'accessibility_page',
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
        var result = html_parser.urls.get_all_poor_link_naming();
        console.log(result);
        console.log(this._get_container());
        console.log(html_parser.templates.get_template('accessibilities_page_poor_link_naming'));
        this._get_container().html(Mustache.render(html_parser.templates.get_template('accessibilities_page_poor_link_naming'), result));
    },
    
    _get_container:function(){
        return $('#'+this.page_container_id);
    }
    
}
