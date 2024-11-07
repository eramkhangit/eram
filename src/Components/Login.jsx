import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './ButtonComponent'
import Context from '../Context/createContext';

function Login() {

    const [loginCheck, setLoginCheck] = useState(false);
    const [registeredUser, setRegisteredUser] = useState({
        mobile: '',
        password: '',
        type: ''
    })
    const [message, setMessage] = useState('')

    const { setUserData, setLoginData, setDashboardPath, setType } = useContext(Context)

    const navigate = useNavigate()
    const location = useLocation()

    const { state: userType } = location;

    const path = `/${userType.toLowerCase()}Registration`;

    useEffect(() => {

        // ________ LocalStorage ___________
        window.localStorage.setItem('User Type', userType)
        setUserData(prev => ({ ...prev, type: userType }))

    }, [userType])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoginCheck(true)
    }

    // ________________ Capitalize String First Letter______________
    useEffect(() => {

        if (userType) { //change
            const capitalizedString = userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase();
            setRegisteredUser({ ...registeredUser, type: capitalizedString })
        }

    }, [userType])

    // ________________ Login API Fetch ______________
    useEffect(() => {

        const userLoggedInCheck = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const response = await fetch(`https://cpointapi.jpsw.in/cpoint/login?type=${registeredUser.type}&mobile=${registeredUser.mobile}&password=${registeredUser.password}`, requestOptions)

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
                }

                const result = await response.json()
                const userName = result.Result

                setMessage(result.Result.message)

                // _____________ direct Api data ________
                setLoginData(result.Result)
                window.localStorage.setItem("User Name", JSON.stringify(userName))

                setTimeout(() => {

                    // ____________ Conditionaly Navigate _____________
                    if (result.Result.message === "login success") {
                        navigate(`/${userType.toLowerCase()}Dashboard`)

                        // setUserData(prev => ({ ...prev, name: userName, dashboardPath: `/${userType.toLowerCase()}Dashboard` })) [this is wrong way to add data in userData it's throw error ]

                        // setUserData(userName)
                        setUserData(userName) //first time when login 
                        setType(userType)
                        setDashboardPath(`/${userType.toLowerCase()}Dashboard`)

                        window.localStorage.setItem("Dashboard Path", JSON.stringify(`/${userType.toLowerCase()}Dashboard`)) // after refresh when login

                    }

                }, 2000)

            } catch (error) {
                console.log(error);
                setMessage("Login failed. Please try again.");
            }
        }

        // _____________ Condition to Login user ______
        if (loginCheck) {
            userLoggedInCheck()
            setLoginCheck(false)
        }

    }, [loginCheck, registeredUser.mobile, registeredUser.password])

    return (
        <div className="container mx-auto">

            <div className="flex justify-center">

                <div className="w-full mt-2 mb-[120px] md:w-8/12">

                    <div className="rounded mx-auto px-4 py-2 md:w-[60%] text-color bg-color">

                        <p className='heading-text-size'>{userType} Login</p>

                        <hr className="w-full h-[1px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />

                        <p className='mt-3 h-7 text-center mb-2 body-text text-red-600'>{message}</p>

                        <form className="space-y-4 mt-2 pt-2" onSubmit={handleSubmit}>

                            <div>
                                <input
                                    type="tel"
                                    value={registeredUser.mobile}
                                    required
                                    placeholder='Mobile Number'
                                    onChange={e => setRegisteredUser(prev => ({ ...prev, mobile: e.target.value }))}
                                    maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                                    className="input-field-color capitalize"
                                />

                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder='Password'
                                    required
                                    value={registeredUser.password}
                                    onChange={e => setRegisteredUser({ ...registeredUser, password: e.target.value })}
                                    className="mb-2 input-field-color"
                                />
                            </div>
                            <p className="subheading-text-size capitalize">Type : {userType ? userType : window.localStorage.getItem('User Type')}</p>

                            <div className="pt-2">
                                <Button text="Sign In" />
                            </div>

                        </form>

                        <div className='py-5'>
                            {
                                userType != "Employee" &&
                                <p className=' text-[15px] text-center'><Link to={path} className="text-color hover:text-blue-500 ">New Sign Up</Link></p>
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}

export default Login