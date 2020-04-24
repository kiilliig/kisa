var mysql      = require('mysql');
var connection = mysql.createConnection({  // 서버의 위치에 대한 정의
  host     : 'localhost',
  user     : 'root',
  password : 'winner2411',
  database : 'fintech', // database&schema
  port : 3306
});

connection.connect();

connection.query('SELECT * FROM fintech.user', function (error, results, fields) {  // result에 배열 형태로 담김
  if (error) throw error;
  console.log('member is: ', results[0].id);
});

connection.end();
