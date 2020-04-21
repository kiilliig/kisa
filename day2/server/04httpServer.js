var http = require("http");
http.createServer(function (req, res) {
  console.log('req!!!');
	var body = "hello Server";
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.end("안녕하세요");
}).listen(3000);
console.log('sever is ready');

// 아무일도 일어나지 않음
// 요청이 들어오기 전까지 서버는 반응없음
