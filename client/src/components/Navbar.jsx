import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../store/store';
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { VscEditorLayout } from "react-icons/vsc";
import { MdSubscriptions } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useCookies } from 'react-cookie';


const Navbar = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const profileMenuRef = useRef()
  const [cookie, setCookie, removeCookie] = useCookies();


  function handelLogout() {
    console.log(cookie.__stid);
    setUser(null);
    localStorage.setItem('_l_user', null);
    removeCookie('__stid');
    navigate('/login');

  }


    window.onclick = (e) => {
      if (user) {
        profileMenuRef.current.style.display = "none"
      }
    }
 
  function handelShowProfile() {
    if (profileMenuRef.current.style.display === "none") {
      profileMenuRef.current.style.display = "initial"
    } else {
      profileMenuRef.current.style.display = "none"
    }

  }
  return (
    <nav className='py-3 max-h-[7vh] px-10 flex justify-between items-center shadow-lg bg-[#0e0e0e]'>
      <div>
        <Link to={'/'}><h2 className='text-white tracking-tight  font-bold text-3xl'><span>Code</span><span className='bg-blue-700 text-black rounded-[3px] px-1 mx-1 py-0'>hub</span></h2></Link>
      </div>

      {
        user ? <div className='flex gap-4 text-[#aeaeae] relative ' >
          <div   className='p-1 bg-[#181818] cursor-pointer rounded-[50%] shadow-lg'>
            <FaUserCircle onMouseEnter={handelShowProfile} className='user'  size={35} color='#aeaeae' />
          </div>

        {/* Drop down menu */}
          <div ref={profileMenuRef} onClick={handelShowProfile} className='bg-[#0e0e0e] p-2 py-4 font-semibold rounded-md  right-0 w-[250px] z-10 text-[#d1d1d1] absolute top-10 hidden transition-all'>
            <div className='flex flex-col w-full '>
              <Link className='w-full py-3 px-4 rounded-md hover:bg-[#212121] flex gap-3' to={'/profile'}><FaRegUser size={23} />{user.username} {user.rooms.size >= 20 ? <TiTick size={23} color='blue' />: ""}</Link>
              <p className='w-full py-3 px-4 rounded-md hover:bg-[#212121] flex gap-3'><MdSubscriptions size={23} />Subscription</p>
              <p className='w-full py-3 px-4 rounded-md hover:bg-[#212121] flex gap-3'><VscEditorLayout size={23} />Rooms</p>
              <button type='button' className='w-full py-3 px-4 rounded-md flex gap-3 hover:bg-[#212121]' onClick={handelLogout}><TbLogout2 size={23} />Logout</button>
            </div>
          </div>


        </div> : <div className='flex gap-2 items-center text-xl'>
          <Link to={'/login'}><h3 className='text-white text-l py-2 px-4'>Login</h3></Link>
          <Link to={'/register'}><h3 className='py-1 px-2 bg-blue-700 text-black font-semibold text-l rounded-sm shadow-lg hover:bg-blue-500'>Sign up</h3></Link>
        </div>
      }


    </nav>
  )
}

export default Navbar