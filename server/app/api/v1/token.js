const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { verifyAccount, getUserInfo } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/token'
})

/**
 * 用户登录(返回token)
 * @param {string} account 用户学工号
 * @param {string} passwd 密码
 */
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    const user = await verifyAccount({id: v.get('body.account'), passwd: v.get('body.passwd')})
    const token = generateToken(user.id, Auth.USER)
    const info = await getUserInfo(user.id)
    ctx.body = {
        token,
        info
    }
})

module.exports = router