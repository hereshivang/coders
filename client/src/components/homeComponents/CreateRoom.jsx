import React from 'react'
import { useNavigate } from 'react-router-dom';
import useCreateRoom from '../../hooks/useCreateRoom';
import toast from 'react-hot-toast';
import useStore from '../../store/store';

const CreateRoom = ({roomInfo , setRoomInfo}) => {
    let navigate = useNavigate();
    const token = useStore((state)=> state.token);

    async function handelSubmit(e){
        e.preventDefault();
        try{
            let res = await useCreateRoom(roomInfo, token);
            if(res.error){
                toast.error(res.error);
                return;
            }
            if(res.success){
                toast.success(res.success);
                // setUser({...user, rooms :[...user.rooms , roomInfo]});
                navigate(`/ide/${roomInfo.roomId}`, {
                    state : {
                        room : res.room
                    }
                })
            }
        }
        catch(err){

        }
        
    }
  return (
    <form onSubmit={handelSubmit} className='flex flex-col gap-3'>
        <div>
            
            <input disabled placeholder='Room Id' className='bg-[#212121] disabled:text-gray-200 disabled:border-0 disabled:bg-[#313131]  text-white input w-full h-11 rounded-sm border-1 focus:outline-none  border-[#2f2f2f] focus:border-gray-200 ' type="text" value={roomInfo.roomId} onChange={(e)=> setRoomInfo({...roomInfo, roomId : e.target.value})} />
        </div>
        <div>
           
            <input placeholder='Room Name' className='bg-[#212121] text-white input w-full h-11 rounded-sm border-1 focus:outline-none  border-[#2f2f2f] focus:border-gray-200 ' type="text" value={roomInfo.roomname} onChange={(e)=> setRoomInfo({...roomInfo, roomname : e.target.value})} />
        </div>
        <div>
            
            <input placeholder='Username' className='bg-[#212121] text-white input w-full h-11 rounded-sm border-1 focus:outline-none  border-[#2f2f2f] focus:border-gray-200 ' type="text" value={roomInfo.username} onChange={(e)=> setRoomInfo({...roomInfo, username : e.target.value})} />
        </div>
        <div className='flex w-full justify-center mt-4'>
            <button className='rounded-sm text-[#969696] font-semibold bg-[#2f2f2f] py-2 px-8 hover:bg-blue-700 hover:text-black'>Create</button>
        </div>
    </form>
  )
}

export default CreateRoom