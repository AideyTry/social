/*
 * @Author: Aiden
 * @Date: 2021-12-28 23:08:25
 * @LastEditTime: 2021-12-28 23:24:04
 * @LastEditors: Aiden
 * @Description: 
 */
const axios = require('axios');

module.exports = {
  school_1: axios.create({
    // baseURL: 'https://qryschool.market.alicloudapi.com/lundroid/youeryuan',
    timeout: 1000,
    headers: {'Authorization': 'AppCode 870473fa4f224ded869486ea76dcdc13'}
  }),
  school_2: axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  })
}