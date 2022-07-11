const client = require('../clientpg')

const getAllFlags = async (appId) => {
  let res = await client.query(`SELECT * FROM flags WHERE app_id = ${appId}`)
  return res.rows;
}

module.exports = getAllFlags