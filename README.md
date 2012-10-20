[![build status](https://secure.travis-ci.org/clux/fsx.png)](http://travis-ci.org/clux/fsx)
# fsx

Just a small utility that I had to copy for many of my modules.
Will scan a directory recursively, keep track of both files and directories, and return two flattened arrays.

Install with

```bash
npm install fsx
```

then

```javascript
var fsx = require('fsx');
var output = fsx.readDirSync(dir);
```

yielding:

```javascript
console.log(output);
->
{
  dirs: [pathstodirs],
  files: [paths to files],
}
```

