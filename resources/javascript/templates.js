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
		general_statistics:'<dl>\n\
                                        <dt>Total URLs Visited</dt>\n\
                                        <dd>{{total_urls}}</dd>\n\
                                        <dt>Total URLs Visited in Your Domain</dt>\n\
                                        <dd>{{total_same_domain_urls}}</dd>\n\
                                        <dt>Total HTML Pages in Your Domain</dt>\n\
                                        <dd>{{total_same_domain_pages}}</dd>\n\
                                        <dt>Total Images</dt>\n\
                                        <dd>{{total_images}}</dd>\n\
                                        <dt>Total Misspellings</dt>\n\
                                        <dd>{{total_misspellings}}</dd>\n\
                                        <dt>Total Time to Retrieve URLs</dt>\n\
                                        <dd>{{total_time}} milliseconds</dd>\n\
                                </dl>',
		url_table:'<table id="url_search_table" class="tablesorter table">\n\
                                <thead>\n\
                                        <th>URL</th>\n\
                                        <th>HTTP Code</th>\n\
                                        <th>Retrieval Time</th>\n\
                                </thead>\n\
                                <tbody>\n\
                                        {{#urls}}\n\
                                                <tr>\n\
                                                        <td>{{url}}</td>\n\
                                                        <td>{{http_code}}</td>\n\
                                                        <td>{{retrieval_time}}</td>\n\
                                                </tr>\n\
                                        {{/urls}}\n\
                                </tbody>\n\
                        </table>'
	},
	
	/**
	* Gets a template based off the templates name
	*/
	get_template:function(which){
		return this.temps[which];
	}
}