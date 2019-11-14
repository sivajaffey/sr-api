var express = require('express');
var app = express();
var host = 'localhost'
var port = 8081;
var user = "root";
var password = "";
var db = "srdb";

// mysql connection
var mysql = require('mysql');
var con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: db
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connection Found!");
  });

app.get('/', function (req, res) {
   res.send('WELcome SR');
});
// add question api
app.post('/question', function (req, res) {
   // input format 
   // input = {
   //    'question' :'what is the question ?',
   //    'tags' : 'java,javascript,php',
   //    'user_id' : 'id778sdf'
   // }
    let data = req['query'];
    let query = {
       'question' : data.question,
       'tags' : data.tags,
       'user_id' : data.user_id
    }
    let sql = `insert into question_table(question,tags,user_id) values('${query.question}','${query.tags}','${query.user_id}')`;
    con.connect(function(err) {
      con.query(sql, function (err, result) {
        if(result.affectedRows > 0) {
         res.send("Added Question");
        }
      });
    });
 });
// add answers api
app.post('/answers', function (req, res) {
   let param = req['query'];
   let query = {
      'answer' : param.answer,
      'ques_id' : param.ques_id,
      'user_id' : param.user_id
   }
   let sql = `insert into answers_table(user_id,question_id,answer) values('${query.user_id}','${query.ques_id}','${query.answer}')`;
    con.connect(function(err) {
      con.query(sql, function (err, result) {
        if(result.affectedRows > 0) {
         res.send("Answer Added");
        }
      });
    });
});
// get answer with question id api
app.post('/get-answers', function (req, res) {
   let param = req['query'];
   let query = {
      'ques_id' : param.ques_id
   }
   let sql = `select user_id,question_id,answer,answer_id from answers_table where question_id=${query.ques_id}`;
   con.connect(function(err) {
      con.query(sql, function (err, result) {
         res.send(result);
      });
    });
});
var server = app.listen(8081, function () {
   console.log("Example app listening at http://%s:%s", host, port)
})