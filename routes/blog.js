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

router.get('/list', async function (ctx, next) {
    // console.log('cur time', Date.now())
    // pm2日志 假装错误测试
    // console.error('假装错误', Date.now())
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''
    const listData = await getList(author, keyword)
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function (ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})

router.get('/mylist',loginCheck, async function (ctx, next) {
    let author = ''
    const keyword = ctx.query.keyword || ''
    if (ctx.state.user) {
        console.log(`ctx.state.user: ${ctx.state.user}`)
        // 强制查询自己的博客
        author = ctx.state.user.username
        const listData = await getList(author, keyword)
        ctx.body = new SuccessModel(listData)
    }
})

router.post('/new', loginCheck, async function (ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async function (ctx, next) {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/del', loginCheck, async function (ctx, next) {
  const author = ctx.session.username
  const val = await delBlog(ctx.query.id, author)
  if (val) {
      ctx.body = new SuccessModel()
  } else {
      ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
