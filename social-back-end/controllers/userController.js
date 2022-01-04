const moment = require('moment')
const jwt = require('jsonwebtoken')
const COS = require('cos-nodejs-sdk-v5')

const dbconfig = require('../util/dbConfig')
const databaseConfig = require('../database.config')

const https = require('../util/request')

const wxConfig = require('../util/wxConfig')

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

// 验证码发送接口
const sendCode = async (req, res) => {
  const {
    body: { phone },
  } = req
  // 通过手机号到redis里面查找code看是否存在
  const redisCode = await global.redis.get(phone)
  console.log('redisCode=', redisCode)
  if (redisCode) {
    res.send({
      code: 400,
      msg: '已经发送过验证码，5分钟内可继续使用验证码',
    })
    return
  }
  const code = rand(100000, 999999)
  console.log('code======', code)
  // 设置手机号对应的验证码过期时间为5分钟
  global.redis.set(phone, code, 'EX', 300)
  res.send({
    code: 200,
    msg: '发送成功',
    data: code,
  })
}

// 获取用户信息
const getUser = (phone) => {
  const sql = 'select * from user where phone=?'
  const sqlArr = [phone]
  return dbconfig.SySqlConnect(sql, sqlArr)
}

// 创建用户副表
const createUserInfo = (user_id, phone) => {
  const sql = 'insert into userinfo(user_id, phone, photos) values(?,?,?)'
  const arr = new Array(5)
  const sqlArr = [user_id, phone, JSON.stringify(arr)]
  return dbconfig.SySqlConnect(sql, sqlArr)
}

// 获取用户的详情
const getUserInfo = async (user_id) => {
  const sql =
    'select username, gender, phone, birthday, hometown, location,schoolName, avatar, job, motto, photos from userinfo where user_id=?'
  const sqlArr = [user_id]
  const result = await dbconfig.SySqlConnect(sql, sqlArr)
  return result[0]
}

/**
 * @description: 修改用户信息
 * @param {*}
 * @Author:
 * @return {*}
 */
const setUserInfo = async (
  user_id,
  username,
  gender,
  phone,
  birthday,
  hometown,
  location,
  schoolName,
  avatar,
  job,
  motto,
  photos
) => {
  console.log('hometown==set===', hometown)
  console.log('location==set===', location)
  const sql =
    'update userinfo set username=?, gender=?, phone=?, birthday=?, hometown=?, location=?, schoolName=?, avatar=?, job=?, motto=?, photos=? where user_id=?'
  const sqlArr = [
    username,
    gender,
    phone,
    birthday,
    hometown,
    location,
    schoolName,
    avatar,
    job,
    motto,
    photos,
    user_id,
  ]
  const result = await dbconfig.SySqlConnect(sql, sqlArr)
  return result
}

/**
 * @description: express中间件，查找用户的id信息
 * @param {*}
 * @Author:
 * @return {*}
 */
const auth = (req, res, next) => {
  const {
    headers: { token },
    body
  } = req
  console.log('token auth=', token)
  console.log('body===', body)
  const { id } = jwt.verify(token, databaseConfig.redisSecret)
  req.userId = id
  console.log('auth req.body=', req.body)
  next()
}

const regUser = async (phone) => {
  const sql = 'insert into user(phone, create_time) value(?,?)'
  const sqlArr = [phone, moment(new Date()).format('YYYY-MM-DD hh:mm:ss')]
  const res = await dbconfig.SySqlConnect(sql, sqlArr)
  if (res.affectedRows == 1) {
    // 执行成功获取用户信息
    // 获取用户信息的方法
    const user = await getUser(phone)
    // 绑定用户的副表
    const userinfo = await createUserInfo(user[0].id, phone)
    if (userinfo.affectedRows == 1) {
      return user
    } else {
      return false
    }
  } else {
    return false
  }
}

// 检测验证码登录是否是第一次登录
const phoneLoginBind = async (phone) => {
  const sql = 'select * from user where phone=?'
  const sqlArr = [phone]
  const res = await dbconfig.SySqlConnect(sql, sqlArr)
  if (res.length) {
    const token = jwt.sign(
      { id: String(res[0].id) },
      databaseConfig.redisSecret
    )
    global.redis.set('token', token)
  } else {
    // 用户第一次注册，绑定表
    // 1.用户注册
    const res = await regUser(phone)
    const token = jwt.sign(
      { id: String(res[0].id) },
      databaseConfig.redisSecret
    )
    global.redis.set('token', token)
  }
}

// 验证码登录
codePhoneLogin = async (req, res) => {
  const {
    body: { phone, code },
  } = req
  const redisCode = await global.redis.get(phone)
  if (redisCode === code) {
    // 登录成功
    await phoneLoginBind(phone)
    const token = await global.redis.get('token')
    res.send({
      code: 200,
      msg: '登录成功',
      token,
    })
  } else if (redisCode && redisCode !== code) {
    res.send({
      code: 400,
      msg: '验证码不正确',
    })
  }
}

userInfo = async (req, res) => {
  console.log('req=======', req)
  const { userId } = req
  const userInfo = await getUserInfo(userId)
  userInfo.photos = JSON.parse(userInfo && userInfo.photos)
  userInfo.location = JSON.parse(userInfo.location)
  userInfo.hometown = JSON.parse(userInfo.hometown)
  console.log('userInfo===', userInfo)
  if (userInfo) {
    res.send({
      code: 200,
      msg: '成功',
      data: userInfo,
    })
  } else {
    res.send({
      code: 400,
      msg: '失败',
    })
  }
}

/**
 * @description: 修改用户信息
 * @param {*}
 * @Author:
 * @return {*}
 */
const editUserInfo = async (req, res) => {
  const {
    userId,
    body: {
      username,
      gender,
      phone,
      birthday,
      location,
      hometown,
      schoolName,
      avatar,
      job,
      motto,
      photos
    },
  } = req

  console.log('userId=======', userId)
  console.log('location=', location)
  console.log('hometown=', hometown)
  console.log('birthday===', birthday)
  const userInfo = await getUserInfo(userId)
  console.log('userInfo===', userInfo)
  console.log('userInfo.affectedRows=', userInfo.affectedRows)
  if (userInfo) {
    const r = await setUserInfo(
      userId,
      username || userInfo.username,
      gender || userInfo.gender,
      phone || userInfo.phone,
      birthday || userInfo.birthday,
      JSON.stringify(hometown) || userInfo.hometown,
      JSON.stringify(location) || userInfo.location,
      schoolName || userInfo.schoolName,
      avatar || userInfo.avatar,
      job || userInfo.job,
      motto || userInfo.motto,
      JSON.stringify(photos) || userInfo.photos,
    )
    console.log('r=', r)
    if (r.affectedRows === 1) {
      res.send({
        code: 200,
        msg: '修改成功',
      })
    } else {
      res.send({
        code: 400,
        msg: '修改失败',
      })
    }
  } else {
    res.send({
      code: 400,
      msg: '失败',
    })
  }
}

/**
 * @description: 文件上传
 * @param {*}
 * @Author:
 * @return {*}
 */
const uploadFile = (req, res) => {
  console.log('req=====', req)
  const {
    files: { file },
  } = req
  const cos = new COS({
    SecretId: 'AKIDub2D7k6ByVquhETR8ZjdHelbASTDgsmR', // 腾讯云份识别ID自己扫码查询
    SecretKey: 'PZS5RWKs99rITN0MSIr9BwRfcIhoeEXY', // 身份秘钥
  })
  cos.putObject(
    {
      Bucket: 'social-1308251497' /* 存储桶 */,
      Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
      Key: file.name /* 文件名 */,
      StorageClass: 'STANDARD', // 上传模式, 标准模式
      Body: file.data, // 上传文件对象
      onProgress: (progressData) => {
        console.log('上传的进度', JSON.stringify(progressData))
      },
    },
    (err, data) => {
      if (err) {
        res.send({
          code: 400,
          msg: '失败',
        })
      } else {
        res.send({
          code: 200,
          url: `https://${data.Location}`,
          msg: '成功',
        })
      }
    }
  )
}

const getSchool = (req, res) => {
  console.log('req=====', req)
  const {
    query: { name, page = 1 },
  } = req
  https
    .school.get(
      `https://qryschool.market.alicloudapi.com/lundroid/searchUniversity?name=${encodeURI(
        name
      )}&page=${page}`
    )
    .then((data) => {
      console.log('data=====', data)
      console.log('data.data.data===', data.data.data)
      res.send({
        code: data.data.code,
        data: data.data.data || [],
        msg: data.data.desc,
      })
    })
    .catch(function (error) {
      res.send({
        code: 500,
        msg: '失败',
      })
    })
}

const loginWechat = (req, res) => {
  const {
    query: { code },
  } = req
  console.log('code======', code)
  https
  .wechat.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.appID}&secret=${wxConfig.AppSecret}&js_code=${code}&grant_type=authorization_code`
  )
  .then((data) => {
    console.log('data=====', data)
    res.send({
      code: data.status,
      data: data.data,
      msg: data.statusText,
    })
  })
  // .catch(function (error) {
  //   console.log('error=', error)
  //   res.send({
  //     code: 500,
  //     msg: '失败',
  //   })
  // })
}

module.exports = {
  auth,
  sendCode,
  codePhoneLogin,
  userInfo,
  editUserInfo,
  uploadFile,
  getSchool,
  loginWechat
}
