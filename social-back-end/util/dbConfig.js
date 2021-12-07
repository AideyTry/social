const mysql = require('mysql')
module.exports = {
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
    }
}
