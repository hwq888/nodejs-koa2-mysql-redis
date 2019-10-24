const { ErrorModel, LoginFailure } = require('../model/resModel')
const verify = require('../utils/verify')
const { AUTHORIZATION } = require('../conf/db')
const { userInfo } = require('../controller/user')
module.exports = async (ctx, next) => {
    // 获取jwt
    const token = ctx.header.authorization;
    if (token !== null && token) {
        try {
            // 解密payload，获取用户名和ID
            let payload = await verify(token, AUTHORIZATION.jwtSecret);
            if (payload) {
                let user = await userInfo(payload.id)
                if (!!user) {
                    const userData =  {
                        name: payload.name,
                        id: payload.id
                    }
                    ctx.state.user = userData // 存用户数据
                }
            }
        } catch (err) {
            ctx.body = new LoginFailure('认证失效，请重新登录')
        }
    } else {
        ctx.body = new ErrorModel('token不能为空')
    }
    await next()
}


// module.exports = async (ctx, next) => {
//     if (ctx.header && ctx.header.authorization) {
//         const token = ctx.header.authorization
//         try {
//             //jwt.verify方法验证token是否有效
//             // jwt.verify(token, AUTHORIZATION.jwtSecret, {
//             //     complete: true
//             // })

//            // 解密payload，获取用户名和ID
//             let payload = await verify(token, AUTHORIZATION.jwtSecret);
//             console.log(`payload:  ${payload}`)
//             if (payload) {
//                 let user = await userInfo(payload.id)
//                 if (!!user) {
//                     // const userData =  {
//                     //     username: payload.username,
//                     //     id: payload.id
//                     // }
//                     await next()
//                     // return userData
//                 } else {
//                     console.log('解析出来的域账号不在数据库中')
//                     ctx.body = new ErrorModel('认证失败')
//                 }
//             } else {
//                 console.log('解析出来的域账号不在数据库中')
//                 ctx.body = new ErrorModel('认证失败')
//             }
//         } catch (error) {
//             jwt.verify(token, 'shhhhh', function(err, decoded) {
//                 if (err) {
//                     ctx.body = new ErrorModel('token失效')
//                 }
//             });
//             // console.log('token过期')
//             //token过期 生成新的token
//             // const newToken = getToken(user);
//             //将新token放入Authorization中返回给前端
//             // ctx.res.setHeader('Authorization', newToken)
//         }
//     }
//     return next().catch(err => {
//         if (err.status === 401) {
//             ctx.status = 401
//             ctx.body =
//             'Protected resource, use Authorization header to get access\n'
//         } else {
//             throw err
//         }
//     })
// }


// module.exports = async (ctx, next) => {
//     if (ctx.session.username) {
//         await next()
//         return
//     }
//     ctx.body = new ErrorModel('未登录')
// }