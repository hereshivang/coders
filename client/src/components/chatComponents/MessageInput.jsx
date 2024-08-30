import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { useParams } from 'react-router-dom';
import useStore from '../../store/store';

const MessageInput = ({socketRef}) => {
  const user = useStore((state)=> state.user);
  const setChat = useStore((state)=> state.setChat);
  let {id} = useParams();
  
  const [message, setMessage] = useState("");
  async function sendMessage(){
    setChat({message, username : user.username});
    setMessage("");
    socketRef.current.emit('sendMessage', {
      roomId : id,
      message,
      username : user.username,
    });
  }

  return (
    <div className='flex gap-2'>
        <input type="text" value={message} onChange={(e)=> setMessage(e.target.value)} className='input w-full text-xl focus:outline-none' />
        <button onClick={sendMessage}  className='btn btn-primary px-2'><IoIosSend size={40} color='white' /></button>
    </div>
  )
}

export default MessageInput