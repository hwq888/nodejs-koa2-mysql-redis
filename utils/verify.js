/**
 * des: token验证
 * **/
const jwt = require('jsonwebtoken');
const { LoginExpiresTime, LoginOut } = require('../model/resModel')
module.exports = (...args) => {
    return new Promise((resolve, reject) => {
        jwt.verify(...args, (error, decoded) => {
            console.log(`error: ${error}`)
            error ? reject(error) : resolve(decoded);
        });
    });
};