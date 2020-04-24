const express = require('express')
var mysql = require('mysql');

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'random',  // 개인password
  database : 'fintech',
  port : 3306
});

connection.connect();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/htmltest', function(req, res){
    res.render('ejsTemplatePage');
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
        //jwt token 받아오기
        console.log("is member!")
      }
    }
  })
})



app.listen(3000)
