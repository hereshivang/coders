import React, { useEffect, useState } from 'react'
import ChatBox from '../chatComponents/ChatBox'
import MessageInput from '../chatComponents/MessageInput'

const Chat = ({socketRef}) => {

  return (
    <div className='flex flex-col gap-2 h-full py-2'>
      <ChatBox />
      <MessageInput socketRef={socketRef} />
    </div>
  )
}

export default Chat