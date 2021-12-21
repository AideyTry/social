/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:34:10
 * @LastEditTime: 2021-12-21 17:26:10
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
var express = require('express');
var router = express.Router();
const userC = require('../controllers/userController');

/* GET users listing. */
router.post('/sendCode', userC.sendCode)
router.post('/codePhoneLogin', userC.codePhoneLogin)
router.get('/userInfo', userC.auth, userC.userInfo)

module.exports = router;
