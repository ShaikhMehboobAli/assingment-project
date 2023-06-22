import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { checkValidation } from '../common/validation/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'

const RegisterForm = () => {
    const navigate = useNavigate();

    const currentDate = new Date();
    const maxDate = format(currentDate, 'yyyy-MM-dd');
    const [userDetail, setUserDetail] = useState({
        username: "",
        phoneNumber: "",
        email: "",
        name: "",
        dateOfBirth: ""
    })
    const [isExisting, setIsExisting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        let userData: any = localStorage.getItem("formData");
        userData = JSON.parse(userData)
        if (userData) {
            const initialDate = new Date(userData.dateOfBirth);
            const formattedDate = initialDate.toISOString().split('T')[0];
            setUserDetail((prevState) => ({
                ...prevState,
                name: userData.name,
                email: userData.email,
                phoneNumber: userData.phoneNumber,
                username: userData.username,
                dateOfBirth: formattedDate
            }));
            setIsExisting(true)
        } else {
            let userInputUserName: any = localStorage.getItem("userInputUserName")
            userInputUserName = JSON.parse(userInputUserName)
            userDetail.username = userInputUserName
            setUserDetail({ ...userDetail })
            setIsExisting(false)
        }


    }, [])


    /*
        validate input fields
    */

    const validateInputs = () => {
        if (!checkValidation(userDetail.name)) {
            toast.error("Please enter valid name", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

            return false
        }
        else if (!checkValidation(userDetail.phoneNumber, 'num')) {
            toast.error("Please enter valid number", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return false
        }
        else if (!checkValidation(userDetail.email, 'email')) {
            toast.error("Please enter valid email", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return false
        }
        else {
            return true
        }
    }

    /*
        handle for submit
    */
    const handleSubmit = () => {
        if (userDetail.phoneNumber.startsWith('+91')) {
            userDetail.phoneNumber = userDetail.phoneNumber.slice(3)
            setUserDetail({ ...userDetail })
        } else if (userDetail.phoneNumber.startsWith('0')) {
            userDetail.phoneNumber = userDetail.phoneNumber.slice(1)
            setUserDetail({ ...userDetail })
        }

        /*
            check for validation
        */
        if (!validateInputs()) return


        userDetail.phoneNumber = '+91' + userDetail.phoneNumber
        setUserDetail({ ...userDetail })
        setIsLoading(true)

        /*
            if user exist then PATCH /forms/{username} api called   
        */
        if (isExisting) {
            console.log(userDetail)
            let url = "http://localhost:3000/forms/" + userDetail.username;
            axios.patch(url, userDetail, {}).then(res => {
                setIsLoading(false)
                navigate('/success')

            }).catch(err => {
                console.log("err", err)
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
            setIsLoading(false)
        } else {
            /*
                if new user then POST /forms api called
            */
            let url = "http://localhost:3000/forms/"
            axios.post(url, userDetail, {}).then(res => {
                setIsLoading(false)
                navigate('/success')

            }).catch(err => {
                console.log("err", err)
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            })
            setIsLoading(false)
        }

    }

    /*
        handle for cancel
    */
    const handleCancel = () => {
        localStorage.clear()
        navigate('/')
    }


    return (
        <div >
            <div className={style.container}>
                <div className={style.subContainer}>
                    <h1 className={style.textTitle}>Please fill the form</h1>
                    <div className={style.bodyContainer}>
                        <label htmlFor='name' className='mt-5 text-green-150' >Name</label>
                        <input name='name' value={userDetail.name} onChange={(e) => {
                            setUserDetail({ ...userDetail, name: e.target.value })
                        }} className={style.inputField} placeholder='Enter name' />

                        <label htmlFor='number' className='mt-5 text-green-150' >Phone Number</label>
                        <input type='tel' name='number' value={userDetail.phoneNumber} onChange={(e) => {
                            setUserDetail({ ...userDetail, phoneNumber: e.target.value })
                        }} className={style.inputField} placeholder='Enter phone number' />

                        <label htmlFor='email' className='mt-5 text-green-150' >Email</label>
                        <input type='email' name='email' value={userDetail.email} onChange={(e) => {
                            setUserDetail({ ...userDetail, email: e.target.value })
                        }} className={style.inputField} placeholder='Enter email' />

                        <label htmlFor='dob' className='mt-5 text-green-150' >DOB</label>
                        <input type='date' max={maxDate} name='dob' value={userDetail.dateOfBirth} onChange={(e) => {
                            setUserDetail({ ...userDetail, dateOfBirth: e.target.value })
                        }} className={style.inputField} placeholder='Enter DOB' />
                        <div className='flex justify-around'>
                            <button className={style.cancelBtnContainer} onClick={handleCancel}>Cancel</button>
                            <button className={style.submitBtnContainer} onClick={handleSubmit}>{isLoading ? <svg className="animate-spin h-5 w-5 rounded-lg border-dashed mr-3 text-center text-white" style={{ borderTop: 'dotted' }} viewBox="0 0 24 24">
                            </svg> : (isExisting ? 'Update' : 'Submit')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm

const style = {
    container: 'w-screen h-screen flex justify-center items-center bg-gradient-to-t from-gray-300 to-white',
    subContainer: 'shadow-lg py-12 px-14 max-w-md w-full h-auto  bg-white rounded-xl mx-5 sm:mx-0',
    textTitle: 'text-3xl font-poppins-bold text-center',
    bodyContainer: 'flex flex-col h-full w-full',
    inputField: 'border border-green-750 px-4 h-12 rounded text-green-750 focus-visible:outline-none placeholder:text-green-750 placeholder:text-sm placeholder:font-light',
    cancelBtnContainer: 'border border-green-150 h-12 w-1/3 rounded-lg font-semibold text-green-150 mt-10',
    submitBtnContainer: 'bg-green-150 h-12 w-1/3 rounded-lg font-semibold text-white mt-10 flex justify-center items-center'
}