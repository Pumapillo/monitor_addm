const fs = require('fs')
const express = require('express')
const app = express()
const dmanagers = require('./dmanager')

var FILE_SPACE = "./data/space.csv";
var FILE_QMANAGERS = "./data/qmanager.csv";

app.use('/static', express.static('static'))

app.get('/', function (req, res) {
  res.redirect(301, '/static/index.html');
})

app.get('/data/free-space', function (req, res) {
	res.set('Cache-Control', 'no-cache');
	fs.stat(FILE_SPACE, function(err, stats){
		if( err ){
			res.send({ success: false, message: err });
			return;
		}

		var rl = require('readline').createInterface({
		  input: fs.createReadStream(FILE_SPACE)
		});

		var mydata = [];
		var first = true;
		rl.on('line', (line) => {
			if( first ){
				first = false;
				return;
			}
			line = line.trim();
			if( line.length == 0){ 
				res.send({ success: true, data: mydata})
				return; 
			}
			var parts = line.split(/,/g);
			if( parts.length == 5){
				mydata.push({
					name: parts[4],
					mount: "/fixes",
					free_space: parts[3]
				})
			}
		}).on('close', () => {
		  res.send({ success:true, date: stats.mtime, data: mydata})
		});
	});
	
})

app.get('/data/qmanagers', function (req, res) {
	res.set('Cache-Control', 'no-cache');

	fs.stat(FILE_SPACE, function(err, stats){
		if( err ){
			res.send({ success: false, message: err });
			return;
		}

		var rl = require('readline').createInterface({
		  input: fs.createReadStream(FILE_QMANAGERS)
		});

		var mydata = [];
		var first = true;
		rl.on('line', (line) => {
			if( first ){
				first = false;
				return;
			}
			line = line.trim();
			if( line.length == 0){
				return; 
			}
			var parts = line.split(/,/g);
			if( parts.length == 3){
				mydata.push({
					name: parts[0],
					host: parts[1],
					state: parts[2]
				})
			}
		}).on('close', () => {
		  res.send({ success:true, date: stats.mtime, data: mydata})
		});
	}); 
})


app.get('/data/deploy', function (req, res) {
	res.set('Cache-Control', 'no-cache');
	dmanagers.checkStateAll(function(mydata){
		res.send({ success:true, date: (new Date()), data: mydata})
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})