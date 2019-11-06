class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}
// 成功
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 0
        console.log(this) // 打印日志
    }
}
// 错误
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = -1
        console.log(this) // 打印日志
    }
}
// token 认证失败
class LoginFailure extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 401
        console.log(this) // 打印日志
    }
}

// 自定义code，方便特殊情况下返回特殊code，不能和上面已建的code重复
class CustomModel extends BaseModel {
    constructor(code, data, message) {
        super(data, message)
        this.code = code
        console.log(this) // 打印日志
    }
}
module.exports = {
    SuccessModel,
    ErrorModel,
    LoginFailure,
    CustomModel
}