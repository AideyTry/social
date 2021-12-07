const Core = require('@alicloud/pop-core')
const moment = require('moment')
const fs = require('fs')
const aliconfig = require('../util/aliconfig')
const dbconfig = require('../util/dbConfig')

const client = new Core(aliconfig.aliclound)

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const validatePhoneCode = []

// 检验的方法
const sendCodeP = (phone) => {
  for (const item of validatePhoneCode) {
    if (phone === item.phone) {
      return true
    }
  }
  return false
}

const findCodeAndPhone = (phone, code) => {
  for (const item of validatePhoneCode) {
    if (phone === item.phone && code == item.code) {
      return 1
    }
  }
  return 0
}

// 模拟验证码发送接口
const sendCode = (req, res) => {
  const phone = req.query.phone
  if (sendCodeP(phone)) {
    res.send({
      code: 400,
      msg: '已经发送过验证码，稍后继续',
    })
  }
  const code = rand(100000, 999999)
  validatePhoneCode.push({
    phone,
    code,
  })
  console.log('validatePhoneCode=', validatePhoneCode)
  res.send({
    code: 200,
    msg: '发送成功',
    data: code
  })
}

// 真实的验证码发送接口
const sendCoreCode = (req, res) => {
  const phone = req.query.phone
  const params = {
    PhoneNumbers: phone,
  }

  const requestOption = {
    method: 'POST',
  }

  client.request('SendSms', params, requestOption).then(
    (result) => {
      console.log(JSON.stringify(result))
      if (resolut.Code == 'OK') {
        res.send({
          code: 200,
          msg: '发送成功',
        })
        validatePhoneCode.push({
          phone,
          code,
        })
        console.log('code===', code)
      } else {
        res.send({
          code: 400,
          msg: '发送失败',
        })
      }
    },
    (ex) => {
      console.log(ex)
    }
  )
}

// 获取用户信息
const getUser = (username) => {
  const sql = 'select * from user where id=? or phone=? or username=?'
  const sqlArr = [username, username, username]
  return dbconfig.SySqlConnect(sql, sqlArr)
}

// 创建用户副表
const createUserInfo = (user_id) => {
  const sql = 'insert into userinfo(user_id, age, gender, job) values(?,?,?,?)'
  const sqlArr = [user_id, 18, 1, '外贸']
  return dbconfig.SySqlConnect(sql, sqlArr)
}

// 获取用户的详情
const getUserInfo = (user_id) => {
  const sql =
    'select age, gender, job, path, birthday from userinfo where user_id=?'
  const sqlArr = [user_id]
  return dbconfig.SySqlConnect(sql, sqlArr)
}

const regUser = async (phone) => {
  const avatar =
    'https://img0.baidu.com/it/u=3901505637,2969081544&fm=26&fmt=auto'
  const sql =
    'insert into user(username, avatar, phone, create_time) value(?,?,?,?)'
  const sqlArr = [
    phone,
    avatar,
    phone,
    moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
  ]
  const res = await dbconfig.SySqlConnect(sql, sqlArr)
  console.log('res in res=', res)
  if (res.affectedRows == 1) {
    // 执行成功获取用户信息
    // 获取用户信息的方法
    const user = await getUser(phone)
    // 绑定用户的副表
    const userinfo = await createUserInfo(user[0].id)
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
  const sql = 'select * from user where username=? or phone=?'
  const sqlArr = [phone, phone]
  const res = await dbconfig.SySqlConnect(sql, sqlArr)
  console.log('res==', res)
  if (res.length) {
    res[0].userinfo = await getUserInfo(res[0].id)
    return res
  } else {
    // 用户第一次注册，绑定表
    // 1.用户注册
    const res = await regUser(phone)
    console.log('regUser res=', res)
    // 2.获取用户详情
    res[0].userinfo = await getUserInfo(res[0].id)
    return res
  }
}

// 验证码登录
codePhoneLogin = async (req, res) => {
  const { phone, code } = req.query
  console.log('phone, code===', phone, code)
  console.log('validatePhoneCode===', validatePhoneCode)
  if (sendCodeP(phone)) {
    let status = findCodeAndPhone(phone, code)
    if (status === 1) {
      console.log('phone===', phone)
      // 登录成功
      const user = await phoneLoginBind(phone)
      res.send({
        code: 200,
        msg: '登录成功',
        data: user[0],
      })
    } else if (status === 0) {
      res.send({
        code: 200,
        msg: '登录失败',
      })
    }
  } else {
    res.send({
      code: 400,
      msg: '登录失败',
    })
  }
}

// 用户名、手机号登录
const login = async (req, res) => {
  const {
    query: { username, password },
  } = req
  if (/^1[3456789]\d{9}$/.test(username)) {
    const sql =
      'select * from user where phone=? and password=? or username=? and password=?'
    const sqlArr = [username, password, username, password]
    const result = await dbconfig.SySqlConnect(sql, sqlArr)
    console.log('result===', result)
    if (result.length > 0) {
      res.send({
        code: 200,
        msg: '成功',
        data: result[0],
      })
    } else {
      res.send({
        code: 400,
        msg: '账号或密码错误',
      })
    }
  }
}

// 查看用户详情
const findUserInfo = async (user_id) => {
  const sql = 'select * from userinfo where user_id=?'
  const sqlArr = [user_id]
  const result = await dbconfig.SySqlConnect(sql, sqlArr)
  console.log('find re=', result)
  if (result.length) {
    return true
  } else {
    return false
  }
}

// 修改用户信息
const setUserInfo = async (user_id, age, gender, job, path, birthday) => {
  console.log(1)
  if (await findUserInfo(user_id)) {
    const sql =
      'update userinfo set age=?, gender=?, job=?, path=?, birthday=? where user_id=?'
    const sqlArr = [age, gender, job, path, birthday, user_id]
    const result = await dbconfig.SySqlConnect(sql, sqlArr)
    console.log('result=', result)
    if (result.affectedRows === 1) {
      const user = await getUser(user_id)
      const userinfo = await getUserInfo(user_id)
      user[0].userinfo = userinfo
      return user
    } else {
      return false
    }
  } else {
    const sql =
      'insert into userinfo (user_id, age, gender, job, path, birthday) values(?,?,?,?,?,?)'
    const sqlArr = [user_id, age, gender, job, path, birthday]
    const res = await dbconfig.SySqlConnect(sql, sqlArr)
    console.log('res=', res)
    if (res.affectedRows === 1) {
      const user = await getUser(user_id)
      const userinfo = await getUserInfo(user_id)
      user[0].userinfo = userinfo
      return user
    } else {
      return false
    }
  }
}

// 修改用户名称
const setUserName = async (user_id, username) => {
  console.log('user_id, username=', user_id, username)
  const sql = 'update user set username=? where id=?'
  const sqlArr = [username, user_id]
  const res = await dbconfig.SySqlConnect(sql, sqlArr)
  console.log('res===', res)
  if (res.affectedRows === 1) {
    return true
  } else {
    return false
  }
}

// 修改用户资料
const editUserInfo = async (req, res) => {
  const { user_id, username, age, gender, job, path, brithday } = req.query
  console.log('user_id, username===', user_id, username)
  const result = await setUserName(user_id, username)
  console.log('result=', result)
  if (result) {
    const r = await setUserInfo(user_id, age, gender, job, path, brithday)
    console.log('r=', r)
    if (r.length) {
      res.send({
        code: 200,
        data: r[0],
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

const getUserPwd = async (user_id) => {
  const sql = 'select password from user where id=?'
  const sqlArr = [user_id]
  const res = await dbconfig.SySqlConnect(sql, sqlArr)
  if (res.length) {
    return res[0].password
  } else {
    return false
  }
}

// 修改用户密码
const setPassword = async (req, res) => {
  const {
    query: { user_id, oldPassword, newPassword },
  } = req
  // 获取数据库中存储的密码
  const userPwd = await getUserPwd(user_id)
  if (oldPassword === userPwd) {
    const sql = 'update user set password=? where id=?'
    const sqlArr = [newPassword, user_id]
    const result = await dbconfig.SySqlConnect(sql, sqlArr)
    if (result.affectedRows === 1) {
      res.send({
        code: 200,
        msg: '修改密码成功',
      })
    } else {
      res.send({
        code: 400,
        msg: '修改密码失败',
      })
    }
  } else {
    res.send({
      code: 400,
      msg: '旧密码输入错误',
    })
  }
}

// 绑定邮箱接口
const bindEmail = async (req, res) => {
    const {query: {user_id, email}} = req
    const sql = 'update user set email=? where id=?'
    const sqlArr = [email, user_id]
    const result = await dbconfig.SySqlConnect(sql, sqlArr)
    if(result.affectedRows === 1){
        res.send({
            'code': 200,
            'msg': '绑定邮箱成功'
        })
    } else {
        res.send({
            'code': 400,
            'msg': '绑定邮箱失败'
        })
    }
}

// 上传头像
const editUserImg = (req, res, next) => {
  // console.log('req, res, next=', req, res, next)
  res.set({
      'content-type': 'application/json;charset=utf-8'
  })
  if(req.file.length === 0){
      res.render('error', {
          message: '上传文件不能为空！'
      })
  } else {
      const { file } = req;
      console.log('file=', file)
      fs.renameSync(`./public/uploads/${file.filename}`, `./public/uploads/${file.originalname}`)

      const {query: {user_id}} = req
      const imgUrl = `http://localhost:3000/uploads/${file.originalname}`
      const sql = 'update user set avatar=? where id=?'
      const sqlArr = [imgUrl, user_id]
      dbconfig.SySqlConnect(sql, sqlArr).then((r) => {
          console.log('r=', r.affectedRows)
          if(r.affectedRows === 1){
              console.log('res===', res)
              res.send({
                  'code': 200,
                  'msg': '修改成功',
                  'url': imgUrl
              })
          } else {
              res.send({
                  'code': 400,
                  'msg': '修改失败',
              })
          }
      }).catch(error => {
          console.log('error=', error)
      })
      // console.log('result===', result)

  }
}

// 检查用户是否已经关注
const checkFollow = async (user_id, follow_id) => {
  const sql = 'select * from follow where user_id=? and follow_id=?'
  const sqlArr = [user_id, follow_id]
  const result = await dbconfig.SySqlConnect(sql, sqlArr)
  if(result.length){
    return true
  } else {
    return false
  }
}

// 发布视频
const publish = async(req, res) => {
  const {query: {user_id, title, url, isOpen, publishImg}} = req
  const sql = 'insert into publish(user_id, title, url, isOpen, publishImg, create_time) values(?,?,?,?,?,?)'
  const sqlArr = [user_id, title, url, isOpen, publishImg, moment(new Date()).format('YYYY-MM-DD hh:mm:ss')]
  const resultId = await dbconfig.SySqlConnect(sql, sqlArr).then(r => {
    return r.insertId
  }).catch(error => {
    console.log('error=', error)
  })
  console.log('resultId===', resultId)
  if(resultId){
    res.send({
      'code': 200,
      'msg': '发布成功'
    })
  } else {
    res.send({
      'code': 400,
      'msg': '发布失败'
    })
  }
}

// 关注
const follow = async(req, res) => {
  const {query: {user_id, follow_id}} = req
  // 检查用户是否已经关注
  const isFollow = await checkFollow(user_id, follow_id)
  console.log('isFollow=====', isFollow)
  if(!isFollow){
    if(user_id === follow_id){
      res.send({
        'code': 400,
        'msg': '不能关注自己'
      })
    } else {
      const sql = 'insert into follow(follow_id, user_id, create_time) values(?,?,?)'
      const sqlArr = [follow_id, user_id, moment(new Date()).format('YYYY-MM-DD hh:mm:ss')]
      console.log('user_id, follow_id===', user_id, follow_id)
      const result = await dbconfig.SySqlConnect(sql, sqlArr)
      console.log('result============', result)
      if(result.affectedRows === 1){
        res.send({
          'code': 200,
          'msg': '关注成功'
        })
      } else {
        res.send({
          'code': 200,
          'msg': '关注失败'
        })
      }
    }
  } else {
    res.send({
      'code': 400,
      'msg': '不能重复关注'
    })
  }
}

// 退出
const logout = (req, res) => {
    res.send({
        'code': 200,
        'msg': '成功退出'
    })
}

module.exports = {
  sendCode,
  sendCoreCode,
  codePhoneLogin,
  login,
  editUserInfo,
  setPassword,
  bindEmail,
  editUserImg,
  follow,
  publish,
  logout
}
