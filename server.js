var express = require('express');
var app = express();
var host = 'localhost'
var port = 3000;

app.get('/', function (req, res) {
   res.send('Hello World');
})
app.post('/question', function (req, res) {
    console.log(req['query']);
    let data = req['query'];
    res.send(data);
 })

var server = app.listen(8081, function () {
   console.log("Example app listening at http://%s:%s", host, port)
})