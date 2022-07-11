const client = require('../clientpg')

const onFlag = async (appId, flagId) => {
  client.query(
    `UPDATE flags SET state = true WHERE id = ${flagId} AND app_id = ${appId}`,
    [],
    (error, results) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Turned On Flag with an id of ${flagId} on app ${appId}`)
        return 
      }

    }
  )
  return 
}

module.exports = onFlag