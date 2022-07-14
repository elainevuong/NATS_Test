import { connect, StringCodec } from "nats"

export const stringCoder = StringCodec()
export const nc = await connect({
  servers: ["nats://127.0.0.1:4222"],
  token: "s3cr3t",
})

export const jsm = await nc.jetstreamManager()

export const js = await nc.jetstream()