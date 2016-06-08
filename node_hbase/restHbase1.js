var express = require('express');
var app = express();
var fs = require("fs");
var thrift = require('thrift');
HBase = require('./gen-nodejs/Hbase.js');
HBaseTypes = require('./gen-nodejs/Hbase_types.js');


function handleFetch(resp) { 

 	connection = thrift.createConnection('localhost', 9090, {
     			transport: thrift.TBufferedTransport,
     			protocol: thrift.TBinaryProtocol
   	});

	connection.on('connect', function() {
				console.log('hhh');
  			var client = thrift.createClient(HBase,connection);
 			client.scannerOpenWithPrefix('vote_aggregate', '' , ['CF:vote_count'], null, function (err, scannerId) {
				console.log('***');
				console.log('***');
    				if (err) {
	    				console.log(err);
	    				return;
   				}	
    				console.log('scannerid : ' + scannerId);
  				client.scannerGetList(scannerId, 100000, function (serr, data) {
      					if (serr) {
        					console.log(serr);
        					return;
      					}
   					console.log(JSON.stringify(data));
        				var arr1 =[];
  					for ( i= 0 ; i< data.length ; i++ ) { 
 					var obj = new Object();
  					obj.partyname = data[i].row.toString();
  					obj.count = data[i].columns['CF:vote_count'].value[3]
   					arr1.push(obj)
     					console.log(' word = '  + data[i].row.toString());
     					console.log(' count = '  + data[i].columns['CF:vote_count'].value.toString('UTF-8') );
   					}
					console.log("obj-1:" + (typeof arr1.toString()));
    					resp.setHeader('Content-Type', 'application/json');
					resp.status(200);
					resp.send(JSON.stringify(arr1));
					resp.end;
    				}); //scannerGetList
    				client.scannerClose(scannerId, function (err) {
      					if (err) {
        					console.log(err);
      					}
    				});  //scannerClose 
    				connection.end();
  			});  //scannerOpenWithPrefix
	}); //connection

	connection.on('error', function(err){
  		console.log('error:', err);
		});
}


var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})


app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
 res.header("Access-Control-Allow-Credentials", "true");
 next();
});


app.get('/fetch', function (req, res) {
	handleFetch(res);
	})


