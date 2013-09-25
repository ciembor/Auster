var FsWatcher = require('./watchers/FsWatcher.js');
var TimeWatcher = require('./watchers/TimeWatcher.js');
var RefreshAction = require('./actions/RefreshAction.js');
var CommandAction = require('./actions/CommandAction.js');

var fs = require('fs');
eval(fs.readFileSync(process.argv[2])+'');
