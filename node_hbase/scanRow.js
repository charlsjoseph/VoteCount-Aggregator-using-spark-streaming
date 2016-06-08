var thrift = require('thrift'),
  HBase = require('./gen-nodejs/Hbase.js'),
  HBaseTypes = require('./gen-nodejs/Hbase_types.js'),
  connection = thrift.createConnection('localhost', 9090, {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TBinaryProtocol
  });



connection.on('connect', function() {
  var client = thrift.createClient(HBase,connection);
  client.scannerOpenWithPrefix('global_aggregate', 'kafka', ['CF:count'], null, function (err, scannerId) {
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

     console.log(' count1 = '  + data[0].columns['CF:count'].value.toString('UTF-8') );
    });
	
    client.scannerClose(scannerId, function (err) {
      if (err) {
        console.log(err);
      }
    });
    connection.end();
  });   

});

connection.on('error', function(err){
  console.log('error:', err);
});





