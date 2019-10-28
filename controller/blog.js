/**
 * desc:把能拼接成sql语句的变量都要加上escape或者xss
 * **/
const xss = require('xss') // 引入xss
const { exec, escape } = require('../db/mysql')
// 查询博客列表
const getList = async (author, keyword) => {
    author = author ? escape(author) : ''
    keyword = keyword ? escape(keyword) : ''
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author=${author} `
    }
    if (keyword) {
        sql += `and title like %${keyword}% `
    }
    sql += `order by createtime desc;`
    // console.log(`sql: ${sql}`)
    return await exec(sql)
}
// 查询博客内容
const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`
    const rows = await exec(sql)
    return rows[0]
}
// 新增博客
const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author 属性
    const title = xss(blogData.title) // 防范xss攻击
    const content = xss(blogData.content) // 防范xss攻击
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}
// 更新博客
const updateBlog = async (blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象，包含 title content 属性
    const id = blogData.id
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
}
// 删除博客
const delBlog = async (id, author) => {
    // id 就是要删除博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}