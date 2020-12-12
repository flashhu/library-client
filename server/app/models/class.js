const { __esModule } = require("validator/lib/isAlpha")
const pool = require('../../core/db')

/**
 * 获取班级列表
 * @param {*} id 学院id
 */
const getClassList = async (id, year) => {
    const queryStr = `SELECT * FROM bm_class WHERE college_id = ${id} AND year = ${year}`;
    return await pool.query(queryStr);
}

module.exports = {
    getClassList
}