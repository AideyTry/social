/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:34:10
 * @LastEditTime: 2021-12-15 15:50:11
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
var express = require('express');
var router = express.Router();

const dbconfig = require('../util/dbConfig')

// 连接redis数据库
global.redis = dbconfig.redisConnect()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
