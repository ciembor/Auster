function CommandAction(command, options) {
  var sys = require('sys')
  var exec = require('child_process').exec;

  var command = command;

	this.exec_command = function() {
    exec(command);
  }
}

CommandAction.prototype = {
	act: function() {
		this.exec_command()
	}
};

module.exports = CommandAction;
