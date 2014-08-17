var http = require('http');
var dwnld = require('./helpers/download');

http.createServer(function (req, res) {
  var args = req.url.slice(1).split('/');

  var title = args[0];
  var start = parseInt(args[1], 10);
  var howManyEpisodes = parseInt(args[2], 10);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  dwnld(title, start, start+howManyEpisodes, function(data) {
    res.write(data.toString());
    res.end();
  });


}).listen(1337, '127.0.0.1');
