import React, { useState } from 'react'
import JoinRoom from '../components/homeComponents/JoinRoom';
import CreateRoom from '../components/homeComponents/CreateRoom';
import { v4 } from 'uuid';
import useStore from '../store/store';

const Home = () => {
    const [toggle, setToggle] = useState('join')
    const user = useStore((state)=> state.user);
    const [roomInfo, setRoomInfo] = useState({
        roomId: "",
        username: user.username,
        roomname: "",
    });

    function handelChange(e) {
        e.target.value === 'create' ? roomInfo.roomId = v4() : roomInfo.roomId = ""
        setToggle(e.target.value);
    }
    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <div className='flex flex-col min-w-[500px] bg-[#151515] p-4 rounded-xl text-[#aeaeae]'>
                <div className='flex justify-around font-semibold my-5 mb-7'>
                    <div className='flex gap-4 items-center justify-center'>
                        <label className='' htmlFor="join">Join Room</label>
                        <input className='radio bg-white' type="radio" checked={toggle === "join"} name="room" onChange={handelChange} value={"join"} id="join" />
                    </div>
                    <div className='flex gap-4 items-center justify-center'>
                        <label htmlFor="create">Create Room</label>
                        <input className='radio bg-white' type="radio" checked={toggle === "create"} name="room" onChange={handelChange} value={"create"} id="create" />
                    </div>
                </div>
                {
                    toggle === "join" ? <JoinRoom setRoomInfo={setRoomInfo} roomInfo={roomInfo} /> : <CreateRoom setRoomInfo={setRoomInfo} roomInfo={roomInfo}/>
                }
            </div>
        </div>
    )
}

export default Home