var watch = require('watch');
var events = require('events');
var Promise = require("node-promise").Promise;
var fs = require('fs');

function FsWatcher(path, options) {
	var that = this;
	this.promise = new Promise();
	if ('/' === path[0]) {
		this.path = path;
	} else {
		this.path = process.cwd() + '/' + path;
	}

	if (/* is directory and */ options) {
		this.recursive = typeof options.recursive !== 'undefined' ? options.recursive : true;
		this.select = options.select;
		this.reject = options.reject;
	}

  	watch.createMonitor(that.path, function (monitor) {
  		monitor.files[that.path + '/index.htm'];
	    that.watcher = monitor;
	    that.promise.resolve();
  	});

}

FsWatcher.prototype = {
	onModification: function(callback) {
		var that = this;
		this.promise.then(function() {
		    that.watcher.on('changed', function(f, curr, prev) {
		        callback();
		    });
		});
	}
};

module.exports = FsWatcher;
