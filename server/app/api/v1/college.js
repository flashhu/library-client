const Router = require('koa-router')
const { getCollegeList } = require('../../models/college')

const router = new Router({
    prefix: '/v1/college'
})

/**
 * 获取学院列表
 */
router.get('/list', async (ctx) => {
    const collegeList = await getCollegeList();
    ctx.body = {
        collegeList
    }
})

module.exports = router