import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import IdePage from './pages/IdePage'
import Profile from './pages/Profile'
import useStore from './store/store'
import './App.css'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookie] = useCookies();
  const crruser = useStore((state)=> state.user);
  const setToken = useStore((state)=> state.setToken);

  useEffect(()=>{
    setToken(cookie.__stid);
  },[]);
  return (
    <div className='bg-black flex flex-col w-[100vw] h-[100vh] '>
      <Navbar />
      <Routes>
        <Route path='/' element={crruser ? <Home/> : <Navigate to={'/login'} />} />
        <Route path='/login' element={!crruser ? <Login /> : <Navigate to={'/'} />}/>
        <Route path='/register' element={!crruser ? <SignUp/> : <Navigate to={'/'} />}/>
        <Route path='/ide/:id' element={crruser ? <IdePage /> : <Navigate to={'/login'} />}/>
        <Route path='/profile' element={crruser ? <Profile /> : <Navigate to={'/login'} />}/>
      </Routes>
    </div>
  )
}

export default App