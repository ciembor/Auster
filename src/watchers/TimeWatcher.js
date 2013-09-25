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
				time_in_sec += time[2-i] * Math.pow(60, i);
			}
		}
    var delay_in_sec = 0;
    if (time_in_sec > current_time_in_sec) {
      delay_in_sec = time_in_sec - current_time_in_sec;
    } else {
      delay_in_sec = time_in_sec + 60 * 60 * 24 - current_time_in_sec;
    }
    setTimeout(function() {
      onEvent(actions);
			setInterval(function() {
				onEvent(actions);
			}, 24 * 60 * 60 * 1000);
		}, delay_in_sec * 1000);
  }
};

module.exports = TimeWatcher;
