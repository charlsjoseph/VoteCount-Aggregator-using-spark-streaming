
var exports = module.exports = { } 

exports.fetchFromHbase = function () {

   	var thrift = require('thrift'),
   	HBase = require('./gen-nodejs/Hbase.js'),
   	HBaseTypes = require('./gen-nodejs/Hbase_types.js'),
   	connection = thrift.createConnection('localhost', 9090, {
     			transport: thrift.TBufferedTransport,
     			protocol: thrift.TBinaryProtocol
   	});

	connection.on('connect', function() {
  			var client = thrift.createClient(HBase,connection);
 			client.scannerOpenWithPrefix('global_aggregate', '' , ['CF:count'], null, function (err, scannerId) {
				console.log('***');
				console.log('***');
    				if (err) {
	    				console.log(err);
	    				return;
   				}	
    				console.log('scannerid : ' + scannerId);
  				client.scannerGetList(scannerId, 10, function (serr, data) {
      					if (serr) {
        					console.log(serr);
        					return;
      					}
   					console.log(JSON.stringify(data));
        				var arr1 =[];
  					for ( i= 0 ; i< data.length ; i++ ) { 
 					var obj = new Object();
  					obj.word = data[i].row.toString();
  					obj.count = data[i].columns['CF:count'].value.toString('UTF-8')
   					arr1.push(obj)
     					console.log(' word = '  + data[i].row.toString());
     					console.log(' count = '  + data[i].columns['CF:count'].value.toString('UTF-8') );
   					}
					console.log("obj-1:" + JSON.stringify(arr1))

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

exports.fetchFromHbase()




