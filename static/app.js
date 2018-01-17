(function(){
	var template_space = $('#template_space').html();
	var template_qmanagers = $('#template_qmanager').html();
	var template_deploy = $('#template_deploy').html();

	function cformat(date){
		var d = new Date(date);
		var result = (d.getDay()+1).toString();
		result += "/";
		result += (d.getMonth()+1).toString();
		result += "/";
		result += (d.getFullYear()).toString();
		result += " ";
		result += (d.getHours()).toString();
		result += ":";
		result += (d.getMinutes()).toString();
		return result;
	}

	function get_data_freespace(){
		$.get('/data/free-space', function(data){
			if( data.success ){
				data.date = cformat(data.date);
				var rendered = Mustache.render(template_space, data);
				$('#contaner-space').html(rendered);
			}
		});
	}

	function get_data_qmanagers(){
		$.get('/data/qmanagers', function(data){
			if( data.success ){
				data.date = cformat(data.date);
				var rendered = Mustache.render(template_qmanagers, data);
				$('#contaner-qmanager').html(rendered);
			}
		});
	}

	function get_data_deploy(){
		$.get('/data/deploy', function(data){
			if( data.success ){
				data.date = cformat(data.date);
				var rendered = Mustache.render(template_deploy, data);
				$('#contaner-deploym').html(rendered);
			}
		});
	}

	get_data_freespace();
	get_data_qmanagers();
	get_data_deploy();
})();