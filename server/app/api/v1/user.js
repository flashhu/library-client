const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')
const { addUser, getUserInfo } = require('../../models/user')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/user'
})

/**
 * 用户注册
 * @param {string} id 学/工号
 * @param {string} name 昵称
 * @param {number} identity 身份id
 * @param {number} college 学院id
 * @param {number} class 班级id
 * @param {string} phone 手机号（可选）
 * @param {string} email 邮箱（可选）
 * @param {string} passwd 密码
 */
router.post('/register', async (ctx)=> {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        id: v.get('body.id'),
        name: v.get('body.name'),
        identity_id: v.get('body.identity'),
        college_id: v.get('body.college'),
        class_id: v.get('body.class'),
        email: v.get('body.email') || '',
        phone: v.get('body.phone') || '',
        passwd: v.get('body.passwd')
    }
    await addUser(user);
    success();
})

/**
 * 获取用户信息
 */
router.get('/info', new Auth().m, async (ctx) => {
    const info = await getUserInfo(ctx.auth.uid)
    ctx.body = {
        info
    }
})

module.exports = router