const { LinValidator, Rule } = require('../../core/lin-validator-v2')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isLength', '学/工号长度需为1~20位', { min: 1, max: 20 })
        ]
        this.email = [
            new Rule('isOptional'),
            new Rule('matches', '邮箱格式有误', /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
        ]
        this.passwd = [
            // 限定长度 包含特殊字符
            new Rule('isLength', '密码长度需为6~32位', { min: 6, max: 32 }),
            new Rule('matches', '密码必需包含大小写字母和数字', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$/)
        ]
        this.name = [
            new Rule('isLength', '名称长度需为1~30位', { min: 1, max: 32 })
        ]
        this.identity = [
            new Rule('isInt', '身份编码格式错误', { min: 1 })
        ]
        this.college = [
            new Rule('isInt', '学院编码格式错误', { min: 1 })
        ]
        this.class = [
            new Rule('isOptional'),
            new Rule('isInt', '班级编码格式错误', { min: 1 })
        ]
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '账号长度不符规则', { min: 1, max: 20 })
        ]
        this.passwd = [
            new Rule('isLength', '密码至少6位', { min: 6, max: 32 })
        ]
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

class ClassListValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '学院编码格式错误', { min: 1 })
        ]
        this.year = [
            new Rule('isInt', '年份格式错误', { min: 1918, max: 3000 })
        ]
    }

    validateId(vals) {
        if (!vals.query.id) {
            throw new Error('id字段是必填参数')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    ClassListValidator
}