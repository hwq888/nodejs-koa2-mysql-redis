const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { login, register, userNameFilter } = require('../controller/users')
const { AUTHORIZATION } = require('../conf/db')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/users')

router.post('/register', async function (ctx, next) {
    const { username, password } = ctx.request.body
    if(!username || !password){
        ctx.body = new ErrorModel('用户名或者密码不能为空')
        return
    }
    const row = await userNameFilter(username)
    if (row) {
        ctx.body = new ErrorModel('用户名已存在')
        return
    }
    const data = await register(username, password)
    if (data.id) {
        ctx.body = new SuccessModel(data)
        return
    }
    ctx.body = new ErrorModel('注册失败，请检查用户名或密码')
})

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
            token: token
        }
        ctx.body = new SuccessModel(userData)
        return
    }
    ctx.body = new ErrorModel('登录失败，请检查用户名或密码！')
})

module.exports = router