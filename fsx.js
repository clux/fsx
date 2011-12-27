var fs = require('fs')
  , path = require('path');

exports.version = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')).version;

exports.readDirSync = function (start) {
  try {
    var found = {
      dirs  : []
    , files : []
    };

    var isDir = function (absPath) {
      if (fs.statSync(absPath).isDirectory()) {
        var data = exports.readDirSync(absPath);
        found.dirs.push(absPath);
        found.dirs = found.dirs.concat(data.dirs);
        found.files = found.files.concat(data.files);
      }
      else {
        var fileName = path.basename(absPath);
        if (!fileName.match(/(^_|^\.|~$)/)) {
          found.files.push(absPath);
        }
      }
    };

    if (fs.lstatSync(start).isDirectory()) {
      fs.readdirSync(start).sort().forEach(function (file) {
        isDir(path.join(start, file));
      });
    }
    else {
      throw new Error('path: ' + start + ' is not a directory');
    }
    return found;
  }
  catch (e) {
    if (e.code !== 'ENOENT') { // dont throw on non-existing dirs
      throw e;
    }
    return false;
  }
};

