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
            
    },
    
    _get_container:function(){
        return $('#'+this.page_container_id);
    }
    
}
