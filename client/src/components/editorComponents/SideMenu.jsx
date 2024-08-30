import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import toast from 'react-hot-toast';

const SideMenu = ({setActiveTab, id, activeTab}) => {
    let rnavigator = useNavigate();
    function handelLeave() {
        rnavigator('/');
    }
    // console.log(roomInfo)

    async function handelRoomIdCopy(){
      try{
        await navigator.clipboard.writeText(`https://codehub-eight.vercel.app/ide/${id}`);
        toast.success("Romm Id Copied on your clipboard")
      }catch(err){
        console.log(err)
      }
    }

    
  return (
    <aside className="min-[600px]:w-[45px] flex flex-col items-center justify-between py-3 bg-[#151515] border-r-[0.5px] border-gray-700 text-white">
        <div className="flex flex-col gap-2 items-center">
          <IoPeopleSharp className={`text-2xl ${ activeTab === "clients" ? 'bg-gray-700 w-8 h-8 p-[3px] rounded-md'  : ''}`} color="#aeaeae" onClick={() => setActiveTab("clients")} />
          <IoMdChatbubbles className={`text-2xl ${ activeTab === "chat" ? 'bg-gray-700 w-8 h-8 p-[3px] rounded-md'  : ''}`} color="#aeaeae" onClick={() => setActiveTab("chat")} />
        </div>
        <div className='flex flex-col gap-4'>
        <FaShare className='text-2xl' color='#aeaeae' onClick={handelRoomIdCopy} />
        <TbLogout2 className="text-2xl" color="#aeaeae" onClick={handelLeave} />
        
        </div>
      </aside>
  )
}

export default SideMenu