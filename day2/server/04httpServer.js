var http = require("http");
http.createServer(function (req, res) {
  console.log('req!!!'); // 요청 날라갈때마다 반응
	var body = "hello Server";
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.end("안녕하세요");
}).listen(3000);
console.log('sever is ready');

// 아무일도 일어나지 않음
// 요청이 들어오기 전까지 서버는 반응없음

// 브라우저에 localhost:3000에 요청을 하면 안녕하세요가 출력되는 것을 알 수 있다
