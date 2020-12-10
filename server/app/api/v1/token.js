const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/token'
})

/**
 * 用户登录
 * @param {string} account 用户学工号
 * @param {string} passwd 密码
 */
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    const user = await User.verifyEmailPassword(v.get('body.account'), v.get('body.secret'))
    // const token = generateToken(user.id, Auth.USER)
    ctx.body = {
        token
    }
})

module.exports = router