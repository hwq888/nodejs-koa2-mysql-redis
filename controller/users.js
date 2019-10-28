/**
 * desc:把能拼接成sql语句的变量都要加上escape或者xss
 * **/
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const register = async (username, password) => {
    username = escape(username) // 格式化 预防sql注入
    password = genPassword(password) // 生成加密密码
    password = escape(password) // 格式化 预防sql注入
    const sql = `
        INSERT INTO users (username, password) VALUES (${username}, ${password})
    `
    const insertData = await exec(sql)
    console.log(`insertData:` + JSON.stringify(insertData))
    return {
        id: insertData.insertId
    }
}
const userNameFilter = async (username) => {
    const sql = `
        select id, username from users where username='${username}'
    `
    const row = await exec(sql)
    return row[0] || ''
}

const login = async (username, password) => {
    username = escape(username) // 格式化 预防sql注入
    password = genPassword(password) // 生成加密密码
    password = escape(password) // 格式化 预防sql注入

    const sql = `
        select id, username, realname from users where username=${username} and password=${password}
    `
    console.log('sql is', sql)

    const rows = await exec(sql)
    return rows[0] || ''
}

const userInfo = async (id) => {
    id = escape(id) // 格式化 预防sql注入
    const sql = `
        select id, username, realname from users where id=${id}
    `
    const rows = await exec(sql)
    return rows[0] || ''
}

module.exports = {
    login,
    register,
    userNameFilter,
    userInfo
}