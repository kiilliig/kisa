const express = require('express')
const app = express()

app.set('views', __dirname + '/views');  // views 파라미터와 + 설정값, dirname(현재디렉토리)에 views폴더경로 세팅
app.set('view engine','ejs')  // view engine으로 ejs를 사용함


app.get('/test', function(req, res){
    res.render('ejsPage');  // rendering을 해줘야 함. vies의 ejsPage.js 읽어들이기
})

app.listen(3000)
