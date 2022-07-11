globalThis.WebSocket = require("websocket").w3cwebsocket;
const { connect, StringCodec } = require('nats.ws');
const stringCoder = StringCodec();
let natsClient

const express = require('express')
const app = express();
const PORT = 8000;

const onFlag = require('./lib/onFlag')
const offFlag = require('./lib/offFlag')
const getAllFlags = require('./lib/getAllFlags')

connect({
  servers: ["ws://127.0.0.1:9090"],
  token: "s3cr3t",
}).then(connection => {
  console.log('Back End Successfully Connected!')
  natsClient = connection
})

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
  natsClient.publish(`flag.data.${appId}.all`, flagRowStringEncoded)
}

function offFlagData(flagRows, appId) {
  const flagRowString = JSON.stringify(flagRows)
  const flagRowStringEncoded = stringCoder.encode(flagRowString)
  natsClient.publish(`flag.data.${appId}.off`, flagRowStringEncoded)
}

function onFlagData(flagRows, appId) {
  const flagRowString = JSON.stringify(flagRows)
  const flagRowStringEncoded = stringCoder.encode(flagRowString)
  natsClient.publish(`flag.data.${appId}.on`, flagRowStringEncoded)
}