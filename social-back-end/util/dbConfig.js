/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:56:10
 * @LastEditTime: 2021-12-15 16:27:01
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
const mysql = require('mysql')
const Redis = require('ioredis')
const databaseConfig = require('../database.config')

module.exports = {
    // 数据库配置
    redisConfig: {
        port: 6379, // Redis port
        host: "1.15.247.162", // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: databaseConfig.redisPassword,
        db: 0,
    },
    mysqlConfig: {
        connectionLimit: 10,
        host: '1.15.247.162',
        port: '3306',
        user: 'root',
        password: databaseConfig.mysqlPassword,
        database: 'social'
    },
    // 链接数据库，使用mysql的数据池链接方式
    sqlConnect: function(sql, callBack){
        console.log('this.config===', this.mysqlConfig)
       const pool = mysql.createConnection(this.mysqlConfig)
       pool.query(sql, callBack);
    },
    // Promise回调
    SySqlConnect: function(sySql, sqlArr){
        return new Promise((resolve, reject) => {
            const pool = mysql.createConnection(this.mysqlConfig)
            pool.query(sySql, sqlArr, (error, data) => {
                if(error){
                    reject(error)
                } else {
                    resolve(data)
                }
            });
            pool.end()
        }).catch(err => console.log('err=',err))
    },
    redisConnect: function(){
        console.log('this.redisConfig===', this.redisConfig)
        return new Redis(this.redisConfig);
    }
}
