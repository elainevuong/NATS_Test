import { nc, stringCoder, jsm, js } from './client_nats.js'
import express from "express"
import pgClient from './clientpg.js' 

jsm.streams.add({ name: `flag_data`, subjects: [`flag.data.1.>`, `flag.data.2.>`] });

const streams = await jsm.streams.list().next();
streams.forEach(stream => {
  console.log(stream.config.subjects)
})

const app = express();
const PORT = 8005;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/getAllFlags/:appId', async (req, res) => {
  const { appId } = req.params
  const flagRows = await getAllFlags(appId)
  transformFlagData(flagRows, appId)
  res.json(flagRows)
})

app.post('/offFlag/:appId/:flagId', async (req, res) => {
  const { appId, flagId } = req.params
  console.log(appId)
  console.log(flagId)
  await offFlag(appId, flagId)

  const flagRows = await getAllFlags(appId)
  offFlagData(flagRows, appId)

  res.json(flagRows)
})

app.post('/onFlag/:appId/:flagId', async (req, res) => {
  const { appId, flagId } = req.params
  await onFlag(appId, flagId)

  const flagRows = await getAllFlags(appId)
  onFlagData(flagRows, appId)

  res.json(flagRows)
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})

function transformFlagData(flagRows, appId) {
  const flagRowString = JSON.stringify(flagRows)
  const flagRowStringEncoded = stringCoder.encode(flagRowString)
  const subject = `flag.data.${appId}.all`

  js.publish(subject, flagRowStringEncoded)
}

function offFlagData(flagRows, appId) {
  const flagRowString = JSON.stringify(flagRows)
  const flagRowStringEncoded = stringCoder.encode(flagRowString)
  const subject = `flag.data.${appId}.off`
  js.publish(subject, flagRowStringEncoded)
}

function onFlagData(flagRows, appId) {
  const flagRowString = JSON.stringify(flagRows)
  const flagRowStringEncoded = stringCoder.encode(flagRowString)
  const subject = `flag.data.${appId}.on`
  js.publish(subject, flagRowStringEncoded)
}

const getAllFlags = async (appId) => {
  let res = await pgClient.query(`SELECT * FROM flags WHERE app_id = ${appId}`)
  return res.rows;
}

const offFlag = async (appId, flagId) => {
  pgClient.query(
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

const onFlag = async (appId, flagId) => {
  pgClient.query(
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