import React, { useEffect, useState } from 'react';


import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import logo from '../common/assets/logo.jpeg'

function VerifyPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        localStorage.clear()
    },[])

    /*
        check for the username present or not
        if present then return the data of the user name
        if not present then store the username in localstorage so that you can get it with differentiation 
    */

    const checkUserName = () => {
        if (!userName) {
            toast.error("Please enter the username !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return
        }
        setIsLoading(true)
        console.log(userName)
        let url = "http://localhost:3000/forms/" + userName
        axios.get(url).then((res) => {
            console.log(res.data)
            localStorage.setItem('formData', JSON.stringify(res.data))
            localStorage.setItem('userInputUserName', JSON.stringify(userName))
            setIsLoading(false)
            navigate('/register')
        }).catch(err => {
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setIsLoading(false)
        })
    }

    return (
        <div className="App">
            <div className={style.container}>
                <div className={style.subContainer}>
                    <img src={logo} className={style.img} alt="Logo" />
                    <div className={style.bodyContainer}>
                        <input onChange={(e) => {
                            setUserName(e.target.value)
                        }} className={style.inputField} placeholder='Username' />
                        <div className='flex mt-7 mb-1'>
                            <input type='checkbox' value={userName} onChange={(e) => {
                            }} className={style.checkBox} name='remember' />
                            <label className='text-center ' htmlFor='remember' >Remember me</label>
                        </div>
                        <button className={style.submitBtnContainer} onClick={() => checkUserName()}>{isLoading ? <svg className="animate-spin h-5 w-5 rounded-lg border-dashed mr-3 text-center text-white" style={{ borderTop: 'dotted' }} viewBox="0 0 24 24">
                        </svg> : 'Verify'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyPage;


const style = {
    container: 'w-screen h-screen flex justify-center items-center bg-gradient-to-t from-gray-300 to-white',
    subContainer: 'shadow-lg p-6 max-w-md w-full h-2/5  bg-white rounded-xl mx-5 sm:mx-0',
    img: 'h-16 w-26 text-center ml-auto mr-auto',
    bodyContainer: 'flex flex-col h-full w-full mt-3',
    inputField: 'border border-green-750 px-4 h-12 mt-5 rounded text-green-750 focus-visible:outline-none placeholder:text-green-750 placeholder:text-sm placeholder:font-light ',
    checkBox: 'w-4 h-4 mr-4 mt-[3px] text-center checked:text-white bg-green-750',
    submitBtnContainer: 'bg-green-150 h-12 rounded-lg font-semibold text-white mt-1'
}