/**
 * des:登录判断的中间件
 * **/
const { ErrorModel, LoginFailure } = require('../model/resModel')
const verify = require('../utils/verify')
const { AUTHORIZATION } = require('../conf/db')
const { userInfo } = require('../controller/users')
module.exports = async (ctx, next) => {
    // 获取jwt
    const token = ctx.header.authorization;
    if (token !== null && token) {
        try {
            // 解密payload，获取用户名和ID
            let payload = await verify(token, AUTHORIZATION.jwtSecret);
            if (payload) {
                // 根据用户id获取用户信息
                let user = await userInfo(payload.id)
                if (!!user) {
                    const userData =  {
                        name: payload.username,
                        id: payload.id
                    }
                    ctx.state.user = userData // 存用户数据
                }
            }
        } catch (err) {
            ctx.body = new LoginFailure('认证失效，请重新登录')
            return
        }
    } else {
        ctx.body = new ErrorModel('token不能为空')
        return
    }
    await next()
}