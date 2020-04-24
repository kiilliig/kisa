// xml에서 데이터만 출력해주는 parseString함수

var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
    console.dir(result.root);
});
