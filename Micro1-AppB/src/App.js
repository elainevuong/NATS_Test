import { useState, useEffect } from 'react'
import { connect, StringCodec } from "nats.ws" 
import Messages from './components/Messages';

const stringCoder = StringCodec(); 

function App() {
  const [ natsConnection, setNatsConnection ] = useState(undefined)
  const [ messages, setMessages ] = useState([])

  const addMessage = (err, msg) => {
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
    
    messages.unshift(transformedMessage)
    const newMessages = messages.slice(0, 10)
    setMessages(newMessages)
  }

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

  const connectionState = natsConnection ? 'connected' : 'disconnected';

  return (
    <div className='App'>
      <h1>Microservice 1, Application B</h1>
      <h2>Connection State: {connectionState}</h2>
      <Messages messages={messages} />
    </div>
  );
}

export default App;