var fs = require('fs');

function callbackFunc(callback) {
  fs.readFile('textfile/text.txt', 'utf8', function (err, result));
}
