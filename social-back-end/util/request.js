/*
 * @Author: Aiden
 * @Date: 2021-12-28 23:08:25
 * @LastEditTime: 2021-12-29 13:55:01
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 */
const axios = require('axios');

module.exports = axios.create({
    // baseURL: 'https://qryschool.market.alicloudapi.com/lundroid/searchUniversity',
    timeout: 1000,
    headers: {'Authorization': 'AppCode 870473fa4f224ded869486ea76dcdc13'}
  })