const client = require('../clientpg')

const offFlag = async (appId, flagId) => {
  client.query(
    `UPDATE flags SET state = false WHERE id = ${flagId} AND app_id = ${appId}`,
    [],
    (error, results) => {
      if (error) {
        console.log(error)
      }
      console.log(`Turned Off Flag with an id of ${flagId} on app ${appId}`)
      return
    }
  )
}

module.exports = offFlag