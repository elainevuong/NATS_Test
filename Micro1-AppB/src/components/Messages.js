const Messages = ( { messages } ) => {
  return (
    <>
      <ul>
        {messages.map((message, index) => {
          console.log(message)
          return (
            <Message 
              subject={message.subject}
              data={message.data}
              time={message.time}
              reply={message.reply}
              key={index}
            />
            )
          })
        }
      </ul>
    </>
  )
}

const Message = ({ subject, data, time, reply }) => { 
  return (
    <>
      <li>Subject Is: {subject}</li>
      <li>Reply Is: {reply}</li>
      <li>Data Is: </li>
      <FormatFlagData flagData={data} />
      <li>Time Is: {time}</li>
      <li>----------------------------</li>
    </>
  )

}

const FormatFlagData = ({ flagData }) => {
  return (
    <>
      <ul>
        {flagData.map(flag => {
          console.log(flag)
          return (
            <>
              <li>Flag IdNumber: {flag.id}</li>
              <li>Flag Name: {flag.name} </li>
              <li>Flag Type: {flag.type} </li>
              <li>Flag State: {String(flag.state)} </li>
              <li>---------</li>
            </>
          )
        })}
      </ul>
    </>
  )
}

export default Messages