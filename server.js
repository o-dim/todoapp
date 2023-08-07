const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 

var db;
// mongoDB 연결
const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://admin:admin123@cluster.0d1qwnl.mongodb.net/?retryWrites=true&w=majority';
MongoClient.connect(mongoURL, function(에러, client) {
    if (에러) return console.log(에러);
    // 데이터 저장하기
    db = client.db('todoapp');
    // 이름과 나이 저장하기
    db.collection('post').insertOne({이름 : '카리나', 직업 : '에스파', _id : 'aespa1'}, function(에러, 결과) {
        console.log('저장완료');
    }); // 생성한 컬렉션 이름에 insert 시킴


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
    MongoClient.connect(mongoURL, function(에러, client) {
        if (에러) return console.log(에러);
        // 데이터 저장하기
        db = client.db('todoapp');
        // 이름과 나이 저장하기
        db.collection('post').insertOne({날짜 : request.body.date, 제목 : request.body.title, _id : 'todo1'}, function(에러, 결과) {
            console.log('저장완료');
        }); // 생성한 컬렉션 이름에 insert 시킴
    
    
        app.listen(8080, function () {
            console.log('server start');
        });
    })
})