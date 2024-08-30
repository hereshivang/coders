import React from 'react'
import useStore from '../../store/store'

const Message = ({ item }) => {
    const user = useStore((state) => state.user);
    return (
        <div>
            <div className={`chat ${item.username == user.username ? "chat-end" : "chat-start"} `} >
                
                <div className="chat-header">
                    {item.username}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble text-wrap">{item.message}</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
        </div>
    )
}

export default Message