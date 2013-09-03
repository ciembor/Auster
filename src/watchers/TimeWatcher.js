var events = require('events');

function TimeWatcher() {
	var that = this;
}

function onEvent(actions) {
	if (Object.prototype.toString.call(actions) !== '[object Array]') {
		actions = [actions];
	}
	actions.forEach(function(action) {
		action.act();
	});
}

TimeWatcher.prototype = {
	onPeriod: function(seconds, actions) {
		setInterval(function() {
			onEvent(actions);
		}, seconds * 1000);
	}
};

module.exports = TimeWatcher;
