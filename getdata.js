var request = require('request');
var fs = require('fs');

var username = "S25860";
var password = "Mat3024$$";
var url_data_space = "http://addm/ui/api/CsvApi?query=search%20FileSystem%20where%20nodecount(traverse%20MountedFileSystem%3AFileSystemMount%3AMounter%3AHost%20where%20hostname%20has%20subword%20'pnetp05'%20or%20hostname%20has%20subword%20'PNETP07'%20or%20hostname%20has%20subword%20'PTXESAIXP01'%20or%20hostname%20has%20subword%20'PQXESAIXP01')%20and%20mount%20has%20subword%20'%2Ffixes'%20processwith%20show%20name%2C%20fs_kind%2C%20fs_type%2C%20%405%2C%20%23MountedFileSystem%3AFileSystemMount%3AMounter%3AHost.name%20as%20'Name'&username=" + username + "&password=" + password;
var url_data_qmanagers = "http://addm/ui/api/CsvApi?query=search%20SoftwareInstance%20where%20name%20has%20subword%20%27QPQXESAIXP0121TMP%27%20or%20name%20has%20subword%20%27QPQXESAIXP0221TMP%27%20or%20name%20has%20subword%20%27QPQXESAIXP0321TMP%27%20or%20name%20has%20subword%20%27QPTXESAIXP0121TMP%27%20or%20name%20has%20subword%20%27QPTXESAIXP0221TMP%27%20or%20name%20has%20subword%20%27QPTXESAIXP0321TMP%27%20or%20name%20has%20subword%20%27QPXESSWASP0221%27%20or%20name%20has%20subword%20%27QPXESSWASP0321%27%20or%20name%20has%20subword%20%27QPXESSWASP0421%27%20or%20name%20has%20subword%20%27QPXESSWASP0521%27%20or%20name%20has%20subword%20%27QPXESSWASP0721%27%20or%20name%20has%20subword%20%27QPXESSWASP0821%27%20or%20name%20has%20subword%20%27QPXESSWASP0921%27%20or%20name%20has%20subword%20%27QPXESSWASP1021%27%20show%20name%2C%20%23%3AHostedSoftware%3AHost%3A.name%20as%20%27Host%28s%29%27%2C%20state%20as%20%27State%27%20processwith%20show%20instance%20as%20%27Instance%27%2C%20%23%3AHostedSoftware%3AHost%3A.name%20as%20%27Host%28s%29%27%2C%20state%20as%20%27State%27&username="  + username + "&password=" + password;

const FILE_SPACE = "./data/space.csv";
const FILE_QMANAGERS = "./data/qmanager.csv";

request
	.get(url_data_space)
	.on('error', function(err) {
		console.log(err)
	}).pipe(fs.createWriteStream(FILE_SPACE))

request
	.get(url_data_qmanagers)
	.on('error', function(err) {
		console.log(err)
	}).pipe(fs.createWriteStream(FILE_QMANAGERS))
/*
request
  .get(url_data_qmanagers)
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  }).on('error', function(err) {
    console.log(err)
  });
  */
