'use strict';

var express = require('express');
var cors = require('cors');
var fs = require('fs');
const formidable = require('formidable')
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, field, file) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    res.json({
      name: file.upfile.name,
      type: file.upfile.type,
      size: file.upfile.size
    })
  })


})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});