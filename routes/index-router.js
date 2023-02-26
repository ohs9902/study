var express = require('express');
var template = require('../lib/template');
var router = express.Router();
router.get('/',(req,res)=>{
    var html = template.HTML('home',`
    <ul>
        <li><a href="/app/posting">게시판</a></li>
        <li><a href="/app/picture">사진</a></li>
    </ul>
    `);
    res.send(html);
});

module.exports = router;