const { connect, StringCodec } = require('nats');
const stringCoder = StringCodec();

const natsClient = connect({
    servers: ["nats://127.0.0.1:4222"], // servers: ["ws://127.0.0.1:9090"],
    token: "s3cr3t"
  }).then(connection => {
    console.log('Successfully Connected Application B to NATS')
    connection.subscribe("flag.data.2.>", {callback: printMessageData})
  })

const express = require('express')
const app = express();
const PORT = 8001;

app.use(express.json());

function printMessageData (err, msg) {
  const { subject, reply } = msg

  const decodedData = stringCoder.decode(msg.data)
  const JSONData = JSON.parse(decodedData)
  JSONData.sort((a, b) => Number(a.id) - Number(b.id))
  
  const transformedMessage = { 
    subject, 
    reply, 
    data: JSONData,
    time: new Date().toUTCString()
  }
  
  console.log(transformedMessage)
}

app.listen(PORT, () => {
  console.log(`Application B running on Port ${PORT}`)
})

