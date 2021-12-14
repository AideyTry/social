/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:34:10
 * @LastEditTime: 2021-12-14 16:10:50
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
var express = require('express');
var router = express.Router();
const userC = require('../controllers/userController');

/* GET users listing. */
router.get('/sendCode', userC.sendCode)
router.get('/codePhoneLogin', userC.codePhoneLogin)
router.get('/userInfo', userC.auth, userC.userInfo)

module.exports = router;
