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
	},
	onTime: function(time, actions) {
		var time = time.split(':');
		var time_in_sec = 0;
		var current_time = new Date();
		var current_time_in_sec = current_time.getSeconds() + (60 * current_time.getMinutes()) + (60 * 60 * current_time.getHours());
		for (i=0; i<3; ++i) {
			if (time[2-i]) {
				time_in_sec += Math.pow(time[2-i], 60);
			}
		}
		setTimeout(function() {
			setInterval(function() {
				onEvent(actions)	;
			}, 24 * 60 * 60 * 1000);
		}, time_in_sec + Math.abs(current_time_in_sec - 24 * 60 * 60) * 1000);
	}
};

module.exports = TimeWatcher;
