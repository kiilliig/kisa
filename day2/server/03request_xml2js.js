//xml2js 패키지를 이용해 xml을 js로 변환해 데이터만 출력하는 것

const request = require('request');
var parseString = require('xml2js').parseString;

request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
  parseString(body, function(err, result){
    var parsedData = result;
    console.log(parsedData.rss.channel[0].item[0].description[0].header[0].wf[0]);

    // work3
    // 예보데이터만 출력해보기
  })
});
