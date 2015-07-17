var cluster = require('cluster');

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;

  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

} else {
  var express = require('express');
  var app = express();

  app.get('/', function(req, res) {
    res.status(200).send('Hello from Worker ' + cluster.worker.id);
  });

  app.listen(3000);
  console.log('Worker' + cluster.worker.id + ' is running!');
}
