const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var mymodule = {};
(function(THIS){
	THIS.dmanagers = {
		prod_pnetp07: "https://pnetp07:9047/ibm/console/logon.jsp",
		prod_pnetp05: "https://pnetp05:9044/ibm/console/logon.jsp",
		cont_ptxesaixp01: "https://ptxesaixp01:9043/ibm/console/logon.jsp",
		cont_pqxesaixp01: "https://pqxesaixp01:9043/ibm/console/logon.jsp"
	}; 

	THIS.checkStateAll = function(callback){
		var data = [];

		function add(err, key, xurl){ 
			if( err === true ){
				data.push({
					name: key,
					url: xurl,
					state: "Running"
				});
			}else{
				data.push({
					name: key,
					url: xurl,
					state: "Down"
				});
			}
		}

		var s1 = THIS.dmanagers.prod_pnetp07;
		var s2 = THIS.dmanagers.prod_pnetp05;
		var s3 = THIS.dmanagers.cont_ptxesaixp01;
		var s4 = THIS.dmanagers.cont_pqxesaixp01;

		THIS.checkState(s1, function(err){
			add(err, "pnetp07", s1);

			THIS.checkState(s2, function(err){
				add(err, "pnetp05", s2);

				THIS.checkState(s3, function(err){
					add(err, "ptxesaixp01", s3);

					THIS.checkState(s4, function(err){
						add(err, "pqxesaixp01", s4);

						callback(data);
					});
				});
			});
		});
	}

	THIS.checkState = function(url, callback){ 
		https.get(url, (res) => {
		  //console.log('statusCode:', res.statusCode);

		  if( res.statusCode == 200){
		  	callback(true);
		  }else{
		  	callback(false);
		  }
		}).on('error', (e) => {
		  callback(false, e);
		}); 
	}

})(mymodule);

module.exports = mymodule;