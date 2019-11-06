// // 解析cookie
// const CookieJson = (ctx) => {
//     const cookieSrc = ctx.headers.cookie
//     console.log(`cookieSrc: ${cookieSrc}`)
//     ctx.cookie = {}
//     cookieSrc.split(';').forEach(item => {
//         if (!item) {
//             return
//         }
//         const arr = item.split('=')
//         const key = arr[0].trim()
//         const val = arr[1].trim()
//         ctx.cookie[key] = val
//     })
// }
// module.exports = {
//     CookieJson
// }