function RefreshAction(options) {
	var WebSocketServer = require('websocket').server;
	var http = require('http');

	var server = http.createServer(function(request, response) {
	    // process HTTP request. Since we're writing just WebSockets server
	    // we don't have to implement anything.
	});
	server.listen(1988, function() { });

	var clients = [];

	// create the server
	wsServer = new WebSocketServer({
	    httpServer: server
	});

	wsServer.on('request', function(request) {
	    var connection = request.accept(null, request.origin);
	    var index = clients.push(connection) - 1;
	    connection.on('close', function(connection) {
	        clients.splice(index, 1);
	    });
	});

	function refresh() {
	    for (var i=0; i < clients.length; i++) {
	        clients[i].send(JSON.stringify({refresh: true}));
	    }
	}
}

RefreshAction.prototype = {
	act: refresh
};

module.exports = RefreshAction;
