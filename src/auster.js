var FsWatcher = require('./watchers/FsWatcher.js');
var RefreshAction = require('./actions/RefreshAction.js');

var fs = require('fs');
eval(fs.readFileSync(process.argv[2])+'');