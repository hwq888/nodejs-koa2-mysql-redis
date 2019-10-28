/**
 * des: token验证
 * **/
const jwt = require('jsonwebtoken');
module.exports = (...args) => {
    return new Promise((resolve, reject) => {
        jwt.verify(...args, (error, decoded) => {
            // console.log(`error: ${error}`)
            error ? reject(error) : resolve(decoded);
        });
    });
};