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

function onEvent(that, event, actions) {
	if (Object.prototype.toString.call(actions) !== '[object Array]') {
		actions = [actions];
	}
	that.promise.then(function() {
	    that.watcher.on(event, function(f, curr, prev) {
	        actions.forEach(function(action) {
	        	action.act();
	        });
	    });
	});
}

FsWatcher.prototype = {
	onModification: function(actions) {
		onEvent(this, 'changed', actions)
	},
	onCreation: function(actions) {
		onEvent(this, 'created', actions)
	},
	onRemoval: function(actions) {
		onEvent(this, 'removed', actions)
	},
	onChange: function(actions) {
		this.onModification(actions);
		this.onCreation(actions);
		this.onRemoval(actions);
	}
};

module.exports = FsWatcher;
