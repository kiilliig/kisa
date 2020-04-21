// express_tutorial/
//├── package.json
//├── public
//│   └── css
//│   └── style.css
//├── router
//│   └── main.js
//├── server.js
//└── views
// ├── about.html
// └── index.html

const express = require('express')
const app = express()
const port = 3000

// app이 서버를 시작해 3000번 포트에 연결 요청
app.get('/', function (req, res) {
  console.log('req!');
  res.send('Hello World!')  // 요청에 대해 router가 hello world 라고 응답
})

app.get('/test', function(req, res){  // test page 구분
  res.send('test world')
})

app.get('/mypagee', function (req, res){
  res.send('이명아의 page')
})

app.listen(3000)
