const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
app.set('view engine', 'ejs');
var db;
// mongoDB 연결
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://admin:admin123@cluster.0d1qwnl.mongodb.net/?retryWrites=true&w=majority';
MongoClient.connect(mongoURL, function(에러, client) {
    db = client.db('todoapp');
    if (에러) return console.log(에러);
    app.listen(8080, function () {
        console.log('server start');
    });
})


app.get('/pet', function(request, response) {
    response.send('반려동물 물품 쇼핑 페이지입니다.');
});

app.get('/beauty', function(request, response) {
    response.send('뷰티용품 쇼핑 페이지입니다.');
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
})
app.get('/write', function(request, response) {
    response.sendFile(__dirname + '/write.html');
})

app.post('/add', (request, response) => {
    response.send('전송 완료');
    db.collection('counter').findOne({name : '게시물개수'}, function(error, result) {
        console.log(result.totalPost);
        var 총게시물 = result.totalPost;
        db.collection('post').insertOne({_id : 총게시물 + 1, 제목 : request.body.title, 날짜 : request.body.date}, function(에러, 결과) {
            console.log('DB에 저장완료');
            db.collection('counter').updateOne({name : '게시물개수'}, { $inc : {totalPost : 1}}, function(error, result) {
                if(error){return console.log(error)}
            })
        });
    });
})

app.get('/list', (request, response) => {
    db.collection('post').find().toArray(function(error, result) {
        console.log(result);
        response.render('list.ejs', {posts : result});
    });
})

app.delete('/delete', (request, response) => {
    console.log(request.body);
    // _id 숫자로 변환하기
    request.body._id = parseInt(request.body._id);
    db.collection('post').deleteOne(request.body, function(error, result) {
        console.log(error);
    })
})