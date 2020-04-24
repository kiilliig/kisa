const express = require('express');
var mysql = require('mysql');
var request = require('request');
const app = express();
var jwt = require('jsonwebtoken');
var auth = require('./library/auth');

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'winner2411',
  database : 'fintech',
  port : 3306
});

connection.connect();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/htmltest', function(req, res){
    res.render('ejsTemplatePage');
});

app.get('/signup', function(req, res){  // singup page router 추가
  res.render('signup');
});

app.get('/login', function(req, res){
  res.render('login');
});

app.get('/main', function(req, res){
  res.render('main');
});

app.get('/balance',function(req , res){
  res.render('balance');
})

app.get('/authTest', function(req,res){
  res.json('welcome')
})

app.get('/authResult', function(req, res){
  var authCode = req.query.code;
  console.log(authCode);
  var option = {
    method : "POST",
    url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
    headers : {
      'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8"
    },
    form : {
        code : authCode,
        client_id : 'iclvvqJgr0kKT9bk4MncO8x6r81QSNcGce3k4jAo',
        client_secret : '6a1u7BFD7ZQt8l6tdwiY3k1zGBOfteeqWgzaoQxe',
        redirect_uri : 'http://localhost:3000/authResult',
        grant_type : 'authorization_code'
    }
  };
  request(option, function (error, response, body) {
    var parseData = JSON.parse(body);
    res.render('resultChild',{data : parseData})
  });
});


app.post('/signup', function(req, res){
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var userAccessToken = req.body.userAccessToken;
  var userRefreshToken = req.body.userRefreshToken;
  var userSeqNo = req.body.userSeqNo;
  console.log(userName,userPassword ,userAccessToken);
  var sql = "INSERT INTO `fintech`.`user`(`user_email`,`user_password`, `accesstoken`,  `refreshtoken`, `userseqno`)"+
  " VALUES (?,?,?,?,?);"

  // signup page에서 입력한 개인정보를 mysql db에 연결시킨다
  connection.query(sql, [userEmail, userPassword, userAccessToken, userRefreshToken, userSeqNo] , function (error, results, fields) {
    if (error) throw error;
    else {
      console.log(this.sql);
      res.json(1);
    }
  });
})

app.post('/login', function(req, res){
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var sql = "SELECT * FROM user WHERE user_email = ?"
  connection.query(sql, [userEmail], function(err, result){
    if(result.length == 0){
      //no member
    }
    else {
      if(userPassword == result[0].user_password){
        //jwt token 내가 사용자한테 제공하는 token
        var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%"
        jwt.sign(
          {
              userId : result[0].id,
              userEmail : result[0].user_email
          },
          tokenKey,
          {
              expiresIn : '10d',
              issuer : 'fintech.admin',
              subject : 'user.login.info'
          },
          function(err, token){
              console.log('로그인 성공', token)
              res.json(token)

          }
        )

        console.log("is member!")
      }
    }
  })
})

// 사용자 계좌목록
app.post('/list', auth, function(req, res){
    //#work6 requsest url https://testapi.openbanking.or.kr/v2.0/user/me?user_seq_no=1100034736
    var user = req.decoded;
    console.log(user);
    var sql = "SELECT * FROM user WHERE id = ?" // db에 접속
    connection.query(sql,[user.userId], function(err, result){
      console.log(result);
      var option = {
        method : "GET",
        url : "https://testapi.openbanking.or.kr/v2.0/user/me",
        headers : {
          'Authorization' : 'Bearer ' + result[0].accesstoken // 개인 db에 갔다와서 accesstoken을 입력해 줄것임~
        },
        qs : {
          user_seq_no : result[0].userseqno
        }
      }
      request(option, function (error, response, body) {
        var parseData = JSON.parse(body);
        console.log(parseData);
        res.json(parseData);
      });

    })
})

// blance 스스로 해보기
app.post('/balance', auth, function(req, res){
  var countnum = Math.floor(Math.random() * 1000000000) + 1;
  var transId = "T991624550" + countnum;

  var user = req.decoded;

  var finUseNum = req.body.fin_use_num;

  var sql = "SELECT * FROM user WHERE id = ?"
  connection.query(sql,[user.userId], function(err, result){
    console.log(result);
    var option = {
      method : "GET",
      url : "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
      headers : {
        'Authorization' : 'Bearer ' + result[0].accesstoken
      },
      qs : {
        bank_tran_id : transId,
        fintech_use_num : finUseNum,
        tran_dtime : '20200423165200'
      }
    }
    request(option, function (error, response, body) {
      var parseData = JSON.parse(body);
      res.json(parseData);
    });

  })
});

app.listen(3000)
