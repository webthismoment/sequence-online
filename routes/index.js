var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index.ejs', { title: 'Express' });  //ejs를 붙이면 views에서 자동으로 찾음
    //res.render('index', { title: 'Express' });
});

module.exports = router;
