var express = require('express');
var router = express.Router();

const User = require('../database/db').User;

/* GET home page. */
router.get('/', function(req, res, next) {

  // 调用对应的DAO，随后使用回调函数获得id，看下面的用法
  // User.create('admin','123124123','admin', (id) => {
  //   console.log('Created user with id: ' + id)
  // });
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
