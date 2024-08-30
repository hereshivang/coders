import React from 'react'
import Client from './Client'

const Clients = ({clients}) => {
  return (
    <>
    <h4 className='text-center font-semibold text-xl mt-4 border-b-2 pb-1 border-gray-400'>Joined User's</h4>
    <div className='flex flex-wrap gap-3 py-3 px-1'>
      
      {
        clients.map((client, i) => <Client key={i} username={client.username} id={client.socketId} />)
      }
    </div>
    </>
  )
}

export default Clients