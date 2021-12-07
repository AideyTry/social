/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:34:10
 * @LastEditTime: 2021-12-02 17:03:24
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
var express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
var router = express.Router();
const userC = require('../controllers/userController');
const dbconfig = require('../util/dbconfig');

/* GET users listing. */
router.get('/', userC.sendCoreCode);
router.get('/sendCode', userC.sendCode)
router.get('/codePhoneLogin', userC.codePhoneLogin)
router.get('/login', userC.login)
router.get('/editUserInfo', userC.editUserInfo)
router.post('/setPassword', userC.setPassword)
router.get('/bindEmail', userC.bindEmail)
router.post('/editUserImg', upload.single('avatar'), userC.editUserImg)
router.post('/publish', userC.publish)
router.post('/follow', userC.follow)
router.get('/logout', userC.logout)

module.exports = router;
