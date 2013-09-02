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

function onAction(that, event, callback) {
	that.promise.then(function() {
	        that.watcher.on(event, function(f, curr, prev) {
            callback();
	    });
	});
}

FsWatcher.prototype = {
	onModification: function(callback) {
		onAction(this, 'changed', callback)
	},
	onCreation: function(callback) {
		onAction(this, 'created', callback)
	},
	onRemoval: function(callback) {
		onAction(this, 'removed', callback)
	}
};

module.exports = FsWatcher;
