var express = require('express');
var app = express();
var host = 'localhost'
var port = 3000;
// mysql connection
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE srdb", function (err, result) {
        console.log("Database created");
    });
  });

app.get('/', function (req, res) {
   res.send('Hello World');
})
app.post('/question', function (req, res) {
    let data = req['query'];
    let query = {
       'question' : data.question,
       'tags' : JSON.stringify(data.tags),
       'user_id' : data.user_id
    }
    let sql = `insert into question_table(question,tag,user_id) values('${query.question}',${query.tags},'${query.user_id}')`;
    console.log(sql)
    con.query(sql,function(res,result){
      console.log('success')
    });  
    res.send(query);
 })

var server = app.listen(8081, function () {
   console.log("Example app listening at http://%s:%s", host, port)
})