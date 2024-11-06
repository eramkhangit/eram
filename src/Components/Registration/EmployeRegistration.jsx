import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../UtilityFun/stringCapitalize'
import Button from '../ButtonComponent'
import '../../App.css'

function ClientRegistration() {

  const [employeeRegistration, setEmployeeRegistration] = useState({
    NAME: '',
    MOBILE: '',
    EMPTYPE: '',
    FATHERNAME: '',
    DOB: '',
    MODIFIEDBY: '',
    CREATEDBY: '',
    EMAIL: '',
    PASSWORD: ''
  });

  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeRegistration((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  // ________________ Capitalize String First Letter______________
  useEffect(() => {

    const capitalizedString = capitalizeWords(employeeRegistration.NAME);
    setEmployeeRegistration(prev => ({ ...prev, NAME: capitalizedString, CREATEDBY: capitalizedString, MODIFIEDBY: capitalizedString }));

  }, [employeeRegistration.NAME]);

  // __________ handle form submit ___________
  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(p => !p)
  };

  //___________ Handle Client Registration API _______________
  useEffect(() => {

    const employeeRegister = async () => {

      try {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();

        // Dynamically append fields, change field into object
        for (const [key, value] of Object.entries(employeeRegistration)) {
          urlencoded.append(key, value);
        }

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow"
        };

        const response = await fetch("https://cpointapi.jpsw.in/cpoint/addemployee", requestOptions)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
        }
        const d = await response.json()
        const m = d.successMessage

        navigate('/messagePage', {
          state: {
            message: m , pageNav: -1
          }
        })

      } catch (error) {
        navigate('/messagePage', {
          state: {
            message: error, pageNav: -1
          }
        }
        )

      }
    }

    if (toggle) {
      employeeRegister()
      setToggle(false)
    }

  }, [toggle])


  return (

    <div className="container mx-auto pt-2 pb-5">
      <div className="flex justify-center">
        <div className="mb-[60px] w-full md:w-8/12">
          <div className="bg-color text-color rounded  p-4 ">
            <p className="heading-text-size">Employee Form</p>

            <hr className="w-full h-[1px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mb-4" />

            {/* <p className="h-[6vh] text-red-600 mb-2 body-text text-center caption">{message}</p> */}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="NAME"
                  value={employeeRegistration.NAME}
                  onChange={handleChange}
                  required
                  placeholder='Employee Name'
                  className="capitalize input-field-color py-3 px-2"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="MOBILE"
                  maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                  value={employeeRegistration.MOBILE}
                  onChange={handleChange}
                  required
                  placeholder='Mobile Number'
                  className="input-field-color py-3 px-2"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="EMAIL"
                  value={employeeRegistration.EMAIL}
                  onChange={handleChange}
                  required
                  placeholder='Email'
                  className="input-field-color py-3 px-2"
                />

              </div>
              <div>
                <input type="password" name="PASSWORD" placeholder="Password"
                  onChange={handleChange}
                  required value={employeeRegistration.PASSWORD} className="input-field-color py-3 px-2" />
              </div>
              {/* 
              <div>
                <label htmlFor="vendor-select" className="hover:outline-none w-full caption border-none ">Select Client Type:</label>
                <select
                  id="vendor-select"
                  value={employeeRegistration.CLIENT_TYPE}
                  onChange={e => setEmployeeRegistration({ ...employeeRegistration, CLIENT_TYPE: e.target.value })}
                  className="input-field-color py-3 px-2" required
                >
                  <option value="" className="">Please choose an option</option>
                  {employeeType.map(employee => (
                    <option key={employee.id} value={employee.type} >
                      {employee.type}
                    </option >
                  ))}
                </select>
              </div> */}

              <div>
                <label htmlFor="birthdayDate" className="block caption">Date of Birth :</label>

                <input
                  type="date"
                  id="birthdayDate"
                  name="DOB"
                  className="input-field-color py-3 px-2"
                  onChange={handleChange}
                  required value={employeeRegistration.DOB}
                />
              </div>

              <div>
                <p className="caption">Gender:</p>
                <div className="flex flex-wrap ">
                  <div className="flex gap-2">
                    {['female', 'male', 'other'].map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          required
                          className="form-radio"
                          type="radio"
                          name="GENDER"
                          value={gender}
                          checked={employeeRegistration.GENDER === gender}
                          onChange={handleChange}
                        />
                        <span className="ml-2 capitalize">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-4">
                <Button text="Sign Up" />
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>

  )
}

export default ClientRegistration