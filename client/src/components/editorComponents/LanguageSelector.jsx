import React from 'react'
import { languages } from '../../assets/languages'


const LanguageSelector = ({setlanguage}) => {
    
    function handelChange(event){
        setlanguage(event.target.value);
    }


  return (
    <>
        <select className='p-2 text-white bg-gray-600 my-2 focus:outline-none' onChange={handelChange} >
            {Object.entries(languages).map(([item,index], i)=>{
                return <option   key={i} value={item} >{item}</option>
            })}
        </select>
    </>
  )
}

export default LanguageSelector