const moment = require('moment')
const jwt = require('jsonwebtoken')
const dbconfig = require('../util/dbConfig')
const databaseConfig = require('../database.config')

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
  const sql = 'insert into userinfo(user_id, phone) values(?,?)'
  const sqlArr = [user_id, phone]
  return dbconfig.SySqlConnect(sql, sqlArr)
}

// 获取用户的详情
const getUserInfo = async (user_id) => {
  const sql =
    'select username, gender, age, phone, birthday, location, avatar, job, motto from userinfo where user_id=?'
  const sqlArr = [user_id]
  const result = await dbconfig.SySqlConnect(sql, sqlArr)
  return result[0]
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
  } = req
  console.log('token auth=', token)
  const { id } = jwt.verify(token, databaseConfig.redisSecret)
  req.userId = id
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

module.exports = {
  auth,
  sendCode,
  codePhoneLogin,
  userInfo,
}
