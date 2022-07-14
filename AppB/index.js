import { connect, StringCodec, consumerOpts, createInbox } from "nats"
import express from "express"

const app = express();
const PORT = 8001;
app.use(express.json());

const stringCoder = StringCodec();

const nc = await connect({
  servers: ["nats://127.0.0.1:4222"], 
  token: "s3cr3t"
})

const js = await nc.jetstream()

const opts = consumerOpts();
opts.deliverLast()
opts.ackAll()
opts.deliverTo(createInbox())

const sub = await js.subscribe("flag.data.2", opts)

const done = (async () => {
  for await (const message of sub) {
    const { subject, reply } = message
    const decodedData = stringCoder.decode(message.data)
    const JSONData = JSON.parse(decodedData)
    JSONData.sort((a, b) => Number(a.id) - Number(b.id))
    
    const transformedMessage = { 
      subject, 
      reply, 
      data: JSONData,
    }

    console.log(transformedMessage)
  }
})();


app.listen(PORT, () => {
  console.log(`Application B running on Port ${PORT}`)
})