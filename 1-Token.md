# Within Express
globalThis.WebSocket = require("websocket").w3cwebsocket;
const { connect, StringCodec } = require('nats.ws');
const stringCoder = StringCodec();
let natsClient

connect({
  servers: ["ws://127.0.0.1:9090"],
  token: "s3cr3t",
}).then(connection => {
  console.log('Back End Successfully Connected!')
  natsClient = connection
})


# Within React
  useEffect(() => {
    const establishConnection = () => {
      if (natsConnection === undefined) {
        connect({
          servers: ["ws://127.0.0.1:9090"],
          token: "s3cr3t",
        })
          .then(connection => {
            console.log('successfully connected!')
            setNatsConnection(connection)

            connection.subscribe("flag.data.2.>", {callback: addMessage})
          })
      }
    }

    establishConnection()
  })


# Within Server Configuration File
authorization {
    token: "s3cr3t"
}