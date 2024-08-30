import React from 'react'
import Avatar from 'react-avatar'

const Client = ({id, username}) => {
  return (
    <div className='flex flex-col items-center gap-1'>
        <Avatar name={username} size={50} round='14px' />
        <span className='font-semibold '>
            {username}
        </span>
    </div>
  )
}

export default Client