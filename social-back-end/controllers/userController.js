const moment = require('moment')
const jwt = require('jsonwebtoken')
const COS = require('cos-nodejs-sdk-v5')
const tencentcloud = require('tencentcloud-sdk-nodejs')

const dbconfig = require('../util/dbConfig')
const databaseConfig = require('../database.config')
const tencentcloudConfig = require('../tencentcloud.config')

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
    body,
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
      photos,
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
      JSON.stringify(photos) || userInfo.photos
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
  https.school
    .get(
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
  https.wechat
    .get(
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

// 腾讯云短信
const sendCodeTencent = (req, res) => {
  const {
    body: { phone },
  } = req
  console.log('phone===', phone)
  const code = rand(100000, 999999)
  // 导入对应产品模块的client models。
  const smsClient = tencentcloud.sms.v20210111.Client

  /* 实例化要请求产品(以sms为例)的client对象 */
  const client = new smsClient({
    credential: {
      /* 必填：腾讯云账户密钥对secretId，secretKey。
       * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
       * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
       * 以免泄露密钥对危及你的财产安全。
       * CAM密匙查询: https://console.cloud.tencent.com/cam/capi */
      secretId: tencentcloudConfig.secretId,
      secretKey: tencentcloudConfig.secretKey,
    },
    /* 必填：地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
    region: 'ap-guangzhou',
    profile: {
      /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
      signMethod: 'HmacSHA256',
      httpProfile: {
        /* SDK默认使用POST方法。
         * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
        reqMethod: 'POST',
        /* SDK有默认的超时时间，非必要请不要进行调整
         * 如有需要请在代码中查阅以获取最新的默认值 */
        reqTimeout: 30,
        /**
         * SDK会自动指定域名。通常是不需要特地指定域名的，但是如果你访问的是金融区的服务
         * 则必须手动指定域名，例如sms的上海金融区域名： sms.ap-shanghai-fsi.tencentcloudapi.com
         */
        endpoint: 'sms.tencentcloudapi.com',
      },
    },
  })

  /* 请求参数，根据调用的接口和实际情况，可以进一步设置请求参数
   * 属性可能是基本类型，也可能引用了另一个数据结构
   * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */
  const params = {
    /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
    SmsSdkAppId: '1400609743',
    /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
    SignName: '蔓草兴趣个人网',
    /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
    ExtendCode: '',
    /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
    // SenderId: '',
    /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
    // SessionContext: '',
    /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
     * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
    PhoneNumberSet: [`+86${phone}`],
    // SmsType: 0,
    /* 是否国际/港澳台短信：0：表示国内短信; 1：表示国际/港澳台短信 */
    // International: 0,
    /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
    TemplateId: '1265968',
    // TemplateName: "蔓草",
    /* 模板参数: 若无模板参数，则设置为空*/
    TemplateParamSet: [code, '5'],
  }
  // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
  client.SendSms(params, function (err, response) {
    // 请求异常返回，打印异常信息
    if (err) {
      console.log(err)
      return
    }
    // 请求正常返回，打印response对象
    console.log('response=', response)
    if (response.SendStatusSet[0].Code === 'Ok') {
      // 设置手机号对应的验证码过期时间为5分钟
      global.redis.set(phone, code, 'EX', 300)
      res.send({
        code: 200,
        RequestId: response.RequestId,
        msg: 'success',
      })
    } else {
      res.send({
        code: 400,
        RequestId: response.RequestId,
        msg: response.SendStatusSet[0].Message,
      })
    }
  })
}

/**
 * @description: 设置性别
 * @param {*}
 * @Author:
 * @return {*}
 */
const setGender = async (req, res) => {
  const {
    body: { gender },
    userId,
  } = req
  const sql = 'update userinfo set gender=? where user_id=?'
  const sqlArr = [gender, userId]
  const result = await dbconfig.SySqlConnect(sql, sqlArr)
  console.log('result===', result)
  if (result.affectedRows === 1) {
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
}

module.exports = {
  auth,
  sendCode,
  sendCodeTencent,
  codePhoneLogin,
  userInfo,
  setGender,
  editUserInfo,
  uploadFile,
  getSchool,
  loginWechat,
}
