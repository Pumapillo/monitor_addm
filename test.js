/*const request = require('request-ssl');

request('https://pnetp05:9044/ibm/console/logon.jsp',function(err,resp,body){
    console.log(err);

    console.log(resp);
});
*/

var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

https.get('https://pnetp05:9044/ibm/console/logon.jsp', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  /*res.on('data', (d) => {
    process.stdout.write(d);
  });*/

}).on('error', (e) => {
  console.error(e);
});