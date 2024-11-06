import React, { useContext, useEffect, useState } from 'react'
import '../../App.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../ButtonComponent'
import Context from '../../Context/createContext';

function EmployeeLoginForm() {

  const [loginCheck, setLoginCheck] = useState(false);
  const [registeredUser, setRegisteredUser] = useState({
    mobile: '9007700557',
    password: '12345',
    type: ''
  })
  const [message, setMessage] = useState('')

  const { setUserData, setLoggedUserType, setPath } = useContext(Context)

  const navigate = useNavigate()
  const location = useLocation()

  const { state: userType } = location;
  // console.log(registeredUser,userType );



  useEffect(() => {

    setUserData(prev => ({ ...prev, type: userType }))
    // ________ LocalStorage ___________
    window.localStorage.setItem('User Type', userType)
    setLoggedUserType(prev => ({ ...prev, type: userType }))

  }, [userType])

  const path = `/${userType.toLowerCase()}Registration`;

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginCheck(true)
  }

  // ________________ Capitalize String First Letter______________
  useEffect(() => {
    const capitalizedString = userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase();
    setRegisteredUser({ ...registeredUser, type: capitalizedString })

  }, [registeredUser.type])

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

        window.localStorage.setItem("User Name", JSON.stringify(result.Result.Name))

        setTimeout(() => {
          // ____________ Conditionaly Navigate _____________
          if (result.Result.message === "User Logged In") {
            navigate(`/${userType.toLowerCase()}Dashboard`)
            setPath(`/${userType.toLowerCase()}Dashboard`)
            setUserData(prev => ({ ...prev, name: userName }))
          }
        }, 2000)

      } catch (error) {
        console.log("User LoggedIn Error :", error);
      }
    }

    // _____________ Condition to Login user ______
    if (loginCheck) {
      userLoggedInCheck()
      setLoginCheck(prev => !prev)

    }

  }, [loginCheck])

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full mt-2 mb-[120px] md:mb-0 md:w-8/12">

          <div className="rounded px-4 py-2 text-color bg-color">

            <p className='heading-text-size'>{userType} Login</p>

            <hr className="w-full h-[1px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />

            <p className='mt-3 h-7 text-center mb-2 body-text text-red-600'>{message}</p>

            <form className="space-y-4 mt-2 pt-2" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={registeredUser.mobile}
                  // required
                  readOnly
                  // placeholder='Mobile Number'
                  // onChange={e => setRegisteredUser(prev => ({ ...prev, mobile: e.target.value }))}
                  maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                  className=" input-field-color capitalize hover:outline-none w-full border-none rounded-md"
                />

              </div>
              <div>
                <input
                  type="password"
                  // placeholder='Password'
                  // required
                  readOnly
                  value={registeredUser.password}
                  // onChange={e => setRegisteredUser({ ...registeredUser, password: e.target.value })}
                  className=" border-none mb-2 w-full hover:outline-none input-field-color rounded-md"
                />
              </div>
              <p className="subheading-text-size capitalize">Type : {userType ? userType : window.localStorage.getItem('User Type')}</p>
              <div className="pt-2">
                <Button text="Sign In" />

              </div>
            </form>

            <div className='py-5'>
              <p className=' text-[15px] text-center'>New <Link to={path} className="text-color hover:text-blue-500 ">Sign Up</Link></p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default EmployeeLoginForm