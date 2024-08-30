import React from 'react'
import Message from './Message'
import useStore from '../../store/store'

const ChatBox = () => {
  const chats = useStore((state)=> state.chat);
  return (
    <div className='max-h-[74vh] overflow-auto h-full'>
      {
        chats.map((item, index)=>{
          return <Message key={index} item={item} />
        })
      }
    </div>
  )
}

export default ChatBox