/**
*   Object in charge of managing the control panel
*/
html_parser.control_panel = {

	// the result page that gets shown on load
	default_page:'general_stats',
	
	init:function(){
		this._build();
		this._bind();
	},
	
	_build:function(){
		
		if(this.default_page == 'general_stats'){
			html_parser.html_results.show_general_stats();
		}
	},
	
	_bind:function(){
		$('#general_stats_button').click(function(){
			html_parser.html_results.show_general_stats();
		});
		$('#urls_button').click(function(){
			html_parser.html_results.show_urls();
		});
		
		
	}
}