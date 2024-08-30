import React from 'react'
import useStore from '../store/store'

const Profile = () => {
  const user = useStore((state)=> state.user);
  return (
    <div className='h-full w-full text-white flex p-4 '>
      <div className='flex-1'>
        <div>
          {user.rooms.map((item)=> {
            return <h4>{item}</h4>
          })}
        </div>
      </div>
      <div className='flex-1 p-2'>
        <div>
          <h3>Username : {user.username}</h3>
        </div>
      </div>
    </div>
  )
}

export default Profile