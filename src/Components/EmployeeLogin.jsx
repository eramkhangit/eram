import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Context from '../Context/createContext'
import Button from './ButtonComponent'

function EmployeeLogin() {

  const [loginCheck, setLoginCheck] = useState(false);
  const [registeredUser, setRegisteredUser] = useState({
    mobile: '',
    password: '',
    type: ''
  })
  const [message, setMessage] = useState('')

  const { setUserData } = useContext(Context)

  const navigate = useNavigate()
  const location = useLocation()
  const { state: userType } = location;

  const path = `/${userType.toLowerCase()}Registration`;

  

  useEffect(() => {

    // ________ LocalStorage ___________
    window.localStorage.setItem('User Type', userType)
    setUserData(prev => ({ ...prev, type: userType }))

  }, [userType])


  // ________________ Capitalize String First Letter______________
  useEffect(() => {
    const capitalizedString = userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase();
    setRegisteredUser({ ...registeredUser, type: capitalizedString })

  }, [userType])


  // ____________ Submit Login __________
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginCheck(true)
  }

  // ________________ Login API Fetch ______________
  useEffect(() => {

    const userLoggedInCheck = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };

        const response = await fetch(`http://cpointapi.jpsw.in/cpoint/login?type=${registeredUser.type}&mobile=${registeredUser.mobile}&password=${registeredUser.password}`, requestOptions)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
        }

        const result = await response.json()
        const userName = result.Result

        setMessage(result.Result.message)

        window.localStorage.setItem("User Name", JSON.stringify(userName))

        setTimeout(() => {

          // ____________ Conditionaly Navigate _____________
          if (result.Result.message) {
            navigate(`/${userType.toLowerCase()}Dashboard`)
            setUserData(prev => ({ ...prev, name: userName, dashboardPath: `/${userType.toLowerCase()}Dashboard` }))

            window.localStorage.setItem("Dashboard Path", JSON.stringify(`/${userType.toLowerCase()}Dashboard`))
          }

        }, 2000)

      } catch (error) {
        setMessage("Login failed. Please try again.");
        // navigate('/messagePage',{state:error})
        // console.log("User LoggedIn Error :", error);
      }
    }

    // _____________ Condition to Login user ______
    if (loginCheck) {
      userLoggedInCheck()
      setLoginCheck(prev => !prev)
    }

  }, [loginCheck, registeredUser.mobile, registeredUser.password])


  return (
    <div className="container mx-auto">

      <div className="flex justify-center">

        <div className="w-full mt-2 mb-[120px] md:w-8/12">

          <div className="rounded mx-auto px-4 pt-2 pb-10 md:w-[60%] text-color bg-color">

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

        
          </div>

        </div>

      </div>
    </div>
  )
}

export default EmployeeLogin