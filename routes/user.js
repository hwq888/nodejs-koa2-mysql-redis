const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { login } = require('../controller/user')
const { AUTHORIZATION } = require('../conf/db')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body
    if(!username || !password){
        ctx.body = new ErrorModel('用户名或者密码不能为空')
        return
    }
    const data = await login(username, password)
    if (data.username) {
        // 生成验证token
        const token = jwt.sign({
            username: data.username,
            id: data.id
        }, AUTHORIZATION.jwtSecret, { expiresIn: AUTHORIZATION.tokenExpiresTime });

        // 设置 session
        // ctx.session.username = data.username
        // ctx.session.realname = data.realname
        const userData = {
            token: token,
            username: data.username,
            realname: data.realname
        }
        ctx.body = new SuccessModel(userData)
        return
    }
    ctx.body = new ErrorModel('登录失败，请检查用户名或密码！')
})

// router.get('/userInfo', async function (ctx, next) {
//     const { id } = ctx.request.body
//     if(!username || !password){
//         ctx.body = new ErrorModel('用户名id不能为空')
//         return
//     }
//     const data = await login(username, password)
//
// })

// router.get('/session-test', async function (ctx, next) {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++

//   ctx.body ={
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   }
// })

module.exports = router