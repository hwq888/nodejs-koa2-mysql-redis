const env = process.env.NODE_ENV  // 环境参数
// 配置
let MYSQL_CONF

// TOKEN配置
let AUTHORIZATION = {
    jwtSecret: 'jwtSecret', // token秘钥
    tokenExpiresTime: 60 * 60 // token过期时间
}

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF,
    AUTHORIZATION
}