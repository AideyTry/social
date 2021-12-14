/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-02 16:56:10
 * @LastEditTime: 2021-12-14 15:01:28
 * @LastEditors: Aiden(戴林波)
 * @Description: 
 * @Email: jason_dlb@sina.cn
 */
const mysql = require('mysql')
const Redis = require('ioredis')

module.exports = {
    rConfig: {
        secret: 'abcdefg12329183928931'
    },
    // 数据库配置
    config: {
        connectionLimit: 10,
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '201923',
        database: 'exapp'
    },
    // 链接数据库，使用mysql的数据池链接方式
    sqlConnect: function(sql, callBack){
        console.log('this.config===', this.config)
       const pool = mysql.createConnection(this.config)
       pool.query(sql, callBack);
    },
    // Promise回调
    SySqlConnect: function(sySql, sqlArr){
        return new Promise((resolve, reject) => {
            const pool = mysql.createConnection(this.config)
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
        // const redis = new Redis("/tmp/redis.sock");
        // return function(){
            return new Redis({
                port: 6379, // Redis port
                host: "1.15.247.162", // Redis host
                family: 4, // 4 (IPv4) or 6 (IPv6)
                // username: 'root',
                password: "aiden235",
                db: 0,
              });
        // }
    //    try {
    //     // const redis = new Redis(6379, "1.15.247.162");
    //     const redis = new Redis({
    //         port: 6379, // Redis port
    //         host: "1.15.247.162", // Redis host
    //         family: 4, // 4 (IPv4) or 6 (IPv6)
    //         // username: 'root',
    //         password: "aiden235",
    //         db: 0,
    //       });
        //   redis.get("token", function (err, result) {
        //     if (err) {
        //       console.error('err======',err);
        //     } else {
        //       console.log('token===',result); // Promise resolves to "bar"
        //     }
        //   });
    //    } catch (error) {
    //        console.log('catch error=', error)
    //    }
    }
}
