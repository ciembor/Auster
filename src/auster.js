var FsWatcher = require('./watchers/FsWatcher.js');
var fs = require('fs');
eval(fs.readFileSync(process.argv[2])+'');