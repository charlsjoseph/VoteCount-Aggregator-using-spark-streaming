var hbase = require('hbase');

var client = new hbase.Client({
  host: 'localhost',
  port: 20550
});

console.log(client)
