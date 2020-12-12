const pool = require('../../core/db')

const getCollegeList = async () => {
    const queryStr = 'SELECT * FROM bm_college';
    return await pool.query(queryStr);
}

module.exports = {
    getCollegeList
}