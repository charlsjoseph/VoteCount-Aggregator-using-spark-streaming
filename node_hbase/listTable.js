var thrift = require('thrift'),
  HBase = require('./gen-nodejs/Hbase.js'),
  HBaseTypes = require('./gen-nodejs/Hbase_types.js'),
  connection = thrift.createConnection('localhost', 9090, {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TBinaryProtocol
  });
  
connection.on('connect', function() {
  var client = thrift.createClient(HBase,connection);
  client.getTableNames(function(err,data) {
    if (err) {
      console.log('get table names error:', err);
    } else {
      console.log('hbase tables:', data);
    }
    connection.end();
  });
});

connection.on('error', function(err){
  console.log('error:', err);
});
