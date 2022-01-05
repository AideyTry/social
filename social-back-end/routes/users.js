/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:34:10
 * @LastEditTime: 2022-01-05 20:33:12
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
router.post('/sendCodeTencent', userC.sendCodeTencent)
router.post('/codePhoneLogin', userC.codePhoneLogin)
router.get('/userInfo', userC.auth, userC.userInfo)
router.post('/editUserInfo', userC.auth, userC.editUserInfo)
router.post('/uploadFile', userC.uploadFile)
router.get('/getSchool', userC.getSchool)
router.get('/loginWechat', userC.loginWechat)
router.post('/setGender',userC.auth, userC.setGender)



module.exports = router;
