const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const indexRouter = require('./routes/index-router');
const communityRouter = require('./routes/community-router');
const fs = require('fs');


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.get('*',(req,res,next)=>{ 
    fs.readdir('./data', function(error, filelist){
      req.list = filelist;
      next();
    });
  });
app.use('/',indexRouter);
app.use('/app',communityRouter);
app.get('/story',(req,res)=>{
    res.sendFile(__dirname+"/about.html");
});
app.use((req,res)=>{
    res.sendFile(__dirname+"/404.html");
})

app.listen(3000,(err)=>{
    if (err) return console.log(err);
    console.log('This server is listening on port 3000');
})