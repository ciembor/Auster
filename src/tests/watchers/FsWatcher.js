var FsWatcher = require('../../watchers/FsWatcher.js');
var fs = require('fs');
var async = require('async');
var rmdir = require('rmdir');
require('should');

describe('FsWatcher', function() {
    before(function(done) {
        fs.mkdir('tmp');
        fs.mkdir('tmp/css');
        fs.mkdir('tmp/js');
        fs.mkdir('tmp/lib');
        fs.open('tmp/index.htm', 'w');
        fs.open('tmp/some.js', 'w');
        fs.open('tmp/some.css', 'w');
        fs.open('tmp/css/main.css', 'w');
        fs.open('tmp/css/sub.css', 'w');
        fs.open('tmp/js/main.js', 'w');
        fs.open('tmp/lib/jquery.js', 'w');
        done();
    });

    describe('handling a single file', function() {
        it('should act on modification', function(done) {
            this.timeout(12000);
            var watcher = new FsWatcher('tmp');
            var success = false;

            watcher.onModification(function() {
                success = true;
            });

            success.should.not.be.ok;

            setTimeout(function() {
                fs.appendFile('tmp/index.htm', 'foo', function(e) {
                  if (e) throw e;
                })
            }, 1000);

            setTimeout(function() {
                success.should.be.ok;
                done();
            }, 9000);
        });
    });

    // describe('handling a directory recursively', function() {
    //     // {
    //     //     path: "",
    //     //     recursive: true,
    //     //     select: regular expression / array of strings?
    //     //     reject: -||-
    //     // }
    //     it('should succed', function(done) {
    //         (1).should.equal(1);
    //         done();
    //     });
    // });

    // describe('should handle all files in a directory (non recursively)', function() {
    //     it('should succed', function(done) {
    //         (1).should.equal(1);
    //         done();
    //     });
    // });

    // describe('should handle specific file types', function() {
    //     it('should succed', function(done) {
    //         (1).should.equal(1);
    //         done();
    //     });
    // });

    after(function(done) {
        rmdir(process.cwd() + '/tmp', function() {
            done();
        });
    });
});