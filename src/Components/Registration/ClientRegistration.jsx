import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../UtilityFun/stringCapitalize'
import Button from '../ButtonComponent'

const clientType = [{
  id: 1,
  type: 'Corporate'
},
{
  id: 2,
  type: 'Individual'
}]

function ClientRegistration() {

  const [clientRegistration, setClientRegistration] = useState({
    NAME: '',
    MOBILE: '',
    CLIENT_TYPE: '',
    EMAIL: '',
    MODIFIEDBY: '',
    CREATEDBY: '',
    PASSWORD: '',
    ADDRESS: '',
    // COMPANY_NAME : ''
  });
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientRegistration((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  // ________________ Capitalize String First Letter______________
  useEffect(() => {

    if (clientRegistration.NAME) {
      const capitalizedString = capitalizeWords(clientRegistration.NAME);
      setClientRegistration({ ...clientRegistration, NAME: capitalizedString, MODIFIEDBY: capitalizedString, CREATEDBY: capitalizedString });
    }

  }, [clientRegistration.NAME]);

  // __________ handle form submit ___________
  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(p => !p)
  };

  //___________ Handle Client Registration API _______________
  useEffect(() => {

    const clientRegister = async () => {

      try {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();

        // Dynamically append fields, change field into object
        for (const [key, value] of Object.entries(clientRegistration)) {
          urlencoded.append(key, value);
        }

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow"
        };

        const response = await fetch("https://cpointapi.jpsw.in/cpoint/addclient", requestOptions)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
        }
        const d = await response.json()
        const m = d.successMessage
            // console.log(m);
            
        navigate('/messagePage', { state: {
          message : m ,
          pageNav : -1 
        } })

      } catch (error) {
       console.log(error)
      }
    }

    if (toggle) {
      clientRegister()
      setToggle(false)
    }

  }, [toggle])


  return (

    <div className="container mx-auto pb-5 pt-2">
      <div className="flex justify-center">
        <div className="mb-[60px] w-full md:w-8/12">
          <div className="bg-color text-color rounded p-6">

            <p className="heading-text-size ">Client Form</p>
            <hr className="w-full h-[1px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mb-4" />

            <form onSubmit={handleSubmit} className="space-y-4 ">

              <div>
                <label htmlFor="vendor-select" className=" hover:outline-none w-full  border-none caption">Select Client Type:</label>
                <select
                  id="vendor-select"
                  value={clientRegistration.CLIENT_TYPE}
                  onChange={e => setClientRegistration({ ...clientRegistration, CLIENT_TYPE: e.target.value })}
                  className="input-field-color py-3 px-2" required
                >
                  <option value="" className="">Please choose an option</option>
                  {clientType.map(client => (
                    <option key={client.id} value={client.type} >
                      {client.type}
                    </option >
                  ))}
                </select>
              </div>

              <div >
                <input
                  type="text"
                  name="NAME"
                  value={clientRegistration.NAME}
                  onChange={handleChange}
                  required
                  placeholder='Client Name'
                  className=" capitalize input-field-color py-3 px-2"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="MOBILE"
                  maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                  value={clientRegistration.MOBILE}
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
                  value={clientRegistration.EMAIL}
                  onChange={handleChange}
                  required
                  placeholder='Email'
                  className="input-field-color py-3 px-2"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="ADDRESS"
                  value={clientRegistration.ADDRESS}
                  onChange={handleChange}
                  required
                  placeholder='Address'
                  className="capitalize input-field-color py-3 px-2"
                />
              </div>
              <div>
                <input type="password" name="PASSWORD" placeholder="Password"
                  onChange={handleChange}
                  required value={clientRegistration.PASSWORD} className="input-field-color py-3 px-2" />
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