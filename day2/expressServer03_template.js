const express = require('express')
const app = express()

app.set('views', __dirname + '/views');
app.set('view engine','ejs')

//request body 받아올 수 있게 옵션 추가
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(express.static(__dirname+'/public'));  // 정적폴더를 public으로 설정

app.get('/htmltest', function(req, res){
    res.render('ejsTemplatePage');
})

app.post('/getData', function(req,res){  // router 추가
  var data = req.body.inputData;  // data 받아주는 부분
  console.log(data);
  console.log(req.body); // request로그를 보여줌
  res.json(1);  // 데이터를 1번으로 보내기로함
})



app.listen(3000)
