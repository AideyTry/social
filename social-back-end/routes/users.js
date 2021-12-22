/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:34:10
 * @LastEditTime: 2021-12-22 15:42:15
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
var express = require('express');
var router = express.Router();
const userC = require('../controllers/userController');
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

/* GET users listing. */
router.post('/sendCode', userC.sendCode)
router.post('/codePhoneLogin', userC.codePhoneLogin)
router.get('/userInfo', userC.auth, userC.userInfo)
router.get('/editUserInfo', userC.auth, userC.editUserInfo)
router.post('/uploadFile', userC.uploadFile)



module.exports = router;
