/**
* Object in charge of managing templates
*/
html_parser.templates = {

	loaded_count:0,
	
	/**
	* Templates for the application
        * Simply add another attribute that is unique
        * If you need to use it, call it in the get_template function that html_parser.templates provides
	*/
	temps:{
		general_statistics:'<dl>\n\
					<dt>Starting URL</dt>\n\
					<dd>{{starting_url}}</dd>\n\
					<dt>Domain</dt>\n\
					<dd>{{domain}}</dd>\n\
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
                        </table>',
		misspelling_items:'<h2>Misspelt words by Occurrence</h2><div class="main_misspelling_container">{{#result}}<div class="misspelling_container">\n\
							<h3>{{name}}</h3>\n\
							<dl>\n\
								<dt>Number of occurrences</dt>\n\
								<dd>{{occurrences}}</dd>\n\
								<dt>URLs that the misspelling appears</dt>\n\
								<dd><ul>{{#urls}}<li>{{.}}</li>{{/urls}}</ul></dd>\n\
							</dl>\n\
							</div>{{/result}}</div>',
                accessibilities_page_poor_link_naming:'<div class="accessibility_container"><h2>Poor Link Naming</h2>\n\
                                                        {{#.}} <dt>{{url}}</dt>{{#html_asset.poor_link_naming}} {{.}} {{/html_asset.poor_link_naming}}{{/.}}\n\
                                                       </div>'
	},
	
	/**
	* Gets a template based off the templates name
	*/
	get_template:function(which){
		return this.temps[which];
	}
}
