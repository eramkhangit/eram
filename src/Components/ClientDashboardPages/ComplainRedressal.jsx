import React, { useContext, useEffect, useState } from 'react'
import Button from '../ButtonComponent';
import Context from '../../Context/createContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ComplainRedressal = () => {
  const [formData, setFormData] = useState({
    NAME: '',
    MOBILE: '',
    EMAIL: '',
    SERVICETYPE: '',
    DESCRIPTION: '',
    MODIFYBY: '',
    CREATEDBY: ''
  });

  // const [serviceType, setServiceType] = useState([])
  // const [isOpen, setIsOpen] = useState(false);
  const [compalinFormToggle, setComplainFormToggle] = useState(false)
  // const [selected, setSelected] = useState(null);
  const navigate = useNavigate()
  const location = useLocation().state
  
  
  const { userData } = useContext(Context)

  const savedData = (userData.name.name ? userData.name.name : userData.name) || ''
  const savedEmail = (userData.name.email ? userData.name.email : userData.email) || ''
  const savedMobile = (userData.name.mobile ? userData.name.mobile : userData.mobile) || ''

  useEffect(() => {

    if (savedData, savedEmail, savedMobile,location.TASKNAME ) {
      setFormData(prev => ({ ...prev, NAME: savedData, CREATEDBY: savedData, MODIFYBY: savedData, EMAIL: savedEmail, MOBILE: savedMobile, SERVICETYPE:location.TASKNAME }))
    }

  }, [savedMobile , location.TASKNAME ])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({ NAME: '', CREATEDBY: '', MOBILE: '', EMAIL: '', DESCRIPTION: '', SERVICETYPE: '', MODIFYBY: '' })
    // setSelected(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setComplainFormToggle(true)
  };

  useEffect(() => {

    const clientComplain = async () => {

      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();

        Object.entries(formData).forEach(([key, value]) => {
          urlencoded.append(key, value);
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow"
        };

        const response = await fetch("https://cpointapi.jpsw.in/cpoint/complain", requestOptions)

        if (!response.ok) {
          setError(`HTTP error! Status: ${response.status}`)
        }

        const d = await response.json()
        const m = d.successMessage
    
        navigate('/messagePage', { state:{ message : m , pageNav : -2 } })
        // setMessage(d)

      } catch (error) {
       console.log(error);
       
      }
    }

    if (compalinFormToggle) {
      clientComplain()
      setComplainFormToggle(false)
      resetForm()
    }

  }, [compalinFormToggle])

  return (
    <div>

      <div className="container mb-[95px] ">

        <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[60%] md:w-[20%]">Complaint Form</p>

        <div className='bg-color md:w-[40%] mx-auto rounded m-3 text-color'>

          {/* <p className='pt-3 pb-4 h-7 text-center body-text text-red-600'>{message}</p> */}

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 rounded ">

            <div className="mb-3">
              <label className="block" htmlFor="name">Order Number</label>
              <input
                type="text"
                id='name'
                placeholder='Complainant Name'
                // name="NAME"
                value={location.OREDER_NO}
                readOnly
                // required
                className="input-field-color mt-1 p-2 w-full rounded"
              />
            </div>


            <div className="mb-3">
              <label className="block" htmlFor="complaint">Complainant Name</label>
              <input
                type="text"
                id='complaint'
                placeholder='Complainant Name'
                name="NAME"
                value={savedData}
                readOnly
                required
                className="input-field-color mt-1 p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id='mobile'
                maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                placeholder='Mobile Number'
                name="MOBILE"
                value={savedMobile}
                // onChange={handleChange}  // make it changeble
                required
                readOnly
                className="input-field-color w-full mt-1 p-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                id='email'
                placeholder='Email'
                name="EMAIL"
                value={savedEmail}
                // onChange={handleChange}
                required
                readOnly
                className="input-field-color w-full mt-1 py-[10px] px-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="type">Service Type</label>
              <input
                type="text"
                id='type'
                placeholder='Service Type'
                // name="EMAIL"
                value={location.TASKNAME}
                // onChange={handleChange}
                required
                readOnly
                className="input-field-color w-full mt-1 py-[10px] px-2 rounded"
              />
            </div>

            {/* <div className="relative mb-3 w-[100%] ">
              <label htmlFor="problem-description" className="block mb-1">Service Type</label>
              <button
                onClick={toggleDropdown}
                className="w-full p-2 border rounded-md input-field-color text-left"
              >
                {selected ? selected : "Select an option "}
              </button>
              {isOpen && (
                <div id="problem-description" className="absolute z-10 w-full input-field-color border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {serviceType.map((service) => (
                    <div
                      key={service.SERVICE_ID}
                      onClick={() => handleOptionClick(service)}
                      className="p-2 hover:bg-gray-300 cursor-pointer"
                    >
                      {service.SERVICENAME}
                    </div>
                  ))}
                </div>
              )}
            </div> */}

            <div className="mb-3">
              <label className="block" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="DESCRIPTION"
                value={formData.DESCRIPTION}
                onChange={handleChange}
                required
                className="input-field-color capitalize w-full mt-1 p-2 rounded"
                rows="4"
              />
            </div>

            <div className='py-4'>
              <Button text={"Submit"} />
            </div>

          </form>
        </div>

      </div>
    </div>

  )
}

export default ComplainRedressal