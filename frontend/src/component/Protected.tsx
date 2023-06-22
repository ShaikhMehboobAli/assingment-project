import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Protected = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate= useNavigate();

    useEffect(()=>{
        let formData: any= localStorage.getItem("formData")
        let userInputUserName: any = localStorage.getItem("userInputUserName")        
        if(JSON.parse(formData) || JSON.parse(userInputUserName)){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false);
            navigate('/')
        }
    },[])


  return (
    <div>
       {isLoggedIn &&  <Outlet/>}
    </div>
  )
}

export default Protected
