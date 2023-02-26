var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var fs = require('fs');

router.get('/posting',(req,res)=>{
   var html = template.HTML('게시판',
   `
   <ul>
    <li><a href="/app/posting_create">게시물 생성</a></li>
    <li><a href="/app/posting_list">게시물 리스트</a></li>
   </ul>
   <a href="/">뒤로가기</a>
   `);
    res.send(html);
});

router.get('/posting_create',(req,res)=>{
    var html = template.HTML('개시물 생성', `
    <form action="/app/posting_create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
        <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
        <input type="submit">
        </p>
    </form>
    `, '');
    
    res.send(html);
      
});

router.post('/posting_create_process',(req,res)=>{
       var post = req.body;       
       var title = post.title;
       var description = post.description;
       fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          res.redirect(`/app/posting`);
       })
});

router.get('/posting_list',(req,res)=>{
    var title = '개시물 리스트';
    var list = template.List(req.list);
    var html = template.HTML(title,list+`<a href="/app/posting">뒤로가기</a>`);
    res.send(html);
    
});

router.get('/:pageId',(req,res,next)=>{
    fs.readFile(`data/${req.params.pageId}`,'utf8',(err,description)=>{
        var title = req.params.pageId;
        var html = template.HTML(title,description+`
        <a href="/app/update/${title}">수정</a>
        <form action="/app/delete_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="삭제">
        </form>
        <a href="/app/posting_list">리스트 보기</a>
        `);
        res.send(html);
    })
});

router.get('/update/:pageId',(req,res)=>{
    fs.readFile(`data/${req.params.pageId}`,'utf8',(err,description)=>{
        var title = req.params.pageId;
        var html = template.HTML(title,description+`
        <a href="/app/update/${title}">수정</a>
        <form action="/app/update_process" method="post">
            <p><input type=""hidden name="id" value="${title}"></p>
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
            <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
            <input type="submit">
            </p>
        </form>
        `);
        res.send(html);
    });
})
router.post('/update_process',(req,res)=>{
    var post = req.body;       
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(err){
        fs.writeFile(`data/${title}`,description,'utf8',(err)=>{
            res.redirect(`/app/${title}`);
        });
    })
});

router.post('/delete_process',(req,res)=>{
    var post = req.body;
    var id = post.id;
    fs.unlink(`data/${id}`,(err)=>{
        res.redirect('/app/posting_list');
    })
});

module.exports = router;