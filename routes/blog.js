const router = require('koa-router')()
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')
// 查询博客列表
router.get('/list', async function (ctx, next) {
    // console.log(`获取cookie[UserLoginToken2]： ${ctx.cookies.get('name')}`)
    // throw new Error('/list 出错了')
    console.log('/list 日志输出')
    console.error('/list 错误日志输出')
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    const listData = await getList(author, keyword)
    // ctx.body = listData
    ctx.body = new SuccessModel(listData, '成功') // 修改
})
// 查询自己的博客
router.get('/mylist',loginCheck, async function (ctx, next) {
    if (ctx.state.user) {
        const author = ctx.state.user.name
        const listData = await getList(author)
        ctx.body = new SuccessModel(listData)
    } else {
        ctx.body = new ErrorModel('找不到用户，查询失败')
    }
})
// 查询博客内容
router.get('/detail', async function (ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})
// 新增博客
router.post('/new', loginCheck, async function (ctx, next) {
    if (ctx.state.user) {
        const body = ctx.request.body
        body.author = ctx.state.user.name
        const data = await newBlog(body)
        ctx.body = new SuccessModel(data)
    } else {
        ctx.body = new ErrorModel('找不到用户，查询失败')
    }
})
// 更新
router.post('/update', loginCheck, async function (ctx, next) {
    const val = await updateBlog(ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel('更新成功')
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})
// 删除
router.del('/del', loginCheck, async function (ctx, next) {
    const author = ctx.state.user.name
    const val = await delBlog(ctx.request.body.id, author)
    if (val) {
        ctx.body = new SuccessModel('删除成功')
    } else {
        ctx.body = new ErrorModel('删除博客失败')
    }
})
module.exports = router