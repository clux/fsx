# adopted from a file utility in socketstream
fs    = require 'fs'
path  = require 'path'

exports.readDirSync = (start) ->
  try
    stat = fs.lstatSync(start)  #resolve symlink
    found = {dirs: [], files: []}
    isDir = (absPath) ->
      stat = fs.statSync(absPath)
      if stat.isDirectory()
        found.dirs.push(absPath)
        data = exports.readDirSync(absPath) #recursive call
        found.dirs = found.dirs.concat(data.dirs)
        found.files = found.files.concat(data.files)
      else
        fileName = path.basename(absPath)
        found.files.push absPath if !fileName.match(/(^_|^\.|~$)/) #ignore "hidden" files
      found

    if stat.isDirectory()
      isDir(path.join(start, file)) for file in fs.readdirSync(start).sort()
    else
      throw (new Error("path: #{start} is not a directory"))
    found

  catch e
    throw(e) if e.code isnt 'ENOENT'  #ignore if optional dirs are missing
    return false

exports.version = JSON.parse(fs.readFileSync(__dirname+'/package.json','utf8')).version

