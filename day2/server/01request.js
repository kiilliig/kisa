const request = require('request');
request('https://search.naver.com/search.naver?where=nexearch&query=%EC%A0%84%EA%B5%AD%EB%82%A0%EC%94%A8&ie=utf8&sm=tab_she&qdt=0', function (error, response, body) {

  console.log('body:', body);
});
