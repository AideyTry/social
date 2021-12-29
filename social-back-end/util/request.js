/*
 * @Author: Aiden
 * @Date: 2021-12-28 23:08:25
 * @LastEditTime: 2021-12-29 12:22:27
 * @LastEditors: Aiden(戴林波)
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
    // baseURL: 'https://qryschool.market.alicloudapi.com/lundroid/searchUniversity',
    timeout: 1000,
    headers: {'Authorization': 'AppCode 870473fa4f224ded869486ea76dcdc13'}
  })
}