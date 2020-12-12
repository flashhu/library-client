const Router = require('koa-router')
const { ClassListValidator } = require('../../validators/validator')
const { getClassList } = require('../../models/class')

const router = new Router({
    prefix: '/v1/class'
})

/**
 * 根据学院id获取对应的班级列表
 * @param {number} id 身份id
 * @param {number} year 入学年份
 */
router.get('/list', async (ctx) => {
    const v = await new ClassListValidator().validate(ctx)
    const classList = await getClassList(v.get('query.id'), v.get('query.year'));
    ctx.body = {
        classList
    }
})

module.exports = router