import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
    const navigate = useNavigate()

    /*
        while success screen load clear all the data local storage so that we can prevent from accident behaviour
    */
    useEffect(() => {
        localStorage.clear()
    }, [])
    const onClickHandle = () => {
        navigate('/')
    }
    return (
        <div className={style.container}>
            <div className={style.subContainer}>
                <div className={style.iconContainer} >
                    <i className={style.icon}>✓</i>
                </div>
                <h1 className={style.successTitle}>Success</h1>
                <p className={style.successBody}>We received your form request.<br /> we'll be in touch shortly!</p>
                <button className={style.homeBtn} onClick={onClickHandle} >Go to Home page</button>
            </div>
        </div>
    )
}

export default SuccessPage


const style = {
    container: 'bg-white p-16 rounded-lg shadow-md inline-block mx-auto my-auto w-screen h-screen text-center',
    subContainer: 'flex flex-col justify-center items-center self-center h-full',
    iconContainer: 'rounded-full h-52 w-52 bg-[#F8FAF5] mx-auto my-0',
    icon: 'text-[#9ABC66] text-8xl leading-[200px] -ml-4',
    successTitle: 'mt-10 font-poppins-bold text-2xl',
    successBody: 'font-poppins-light mt-3 text-lg',
    homeBtn: 'bg-green-150 h-12 rounded-lg font-semibold text-white mt-5 px-4'
}