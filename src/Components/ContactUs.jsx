import React, { useContext, useState, useEffect } from 'react'
import { Button } from '@material-tailwind/react';
import Context from '../Context/createContext';
import { useNavigate } from 'react-router-dom';

function ContactUs() {

  const [queryData, setQueryData] = useState({
    NAME: '',
    MOBILE: '',
    EMAIL: '',
    QUERY: '',
    MODIFYBY: '',
    CREATEDBY: ''
  })
  const [toggle, setToggle] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { userData, loginData } = useContext(Context)


  const name = loginData.name ? loginData.name : userData.name
  const mobile = loginData.mobile ? loginData.mobile : userData.mobile
  const email = loginData.email ? loginData.email : userData.email
  const company = loginData.company ? loginData.company : userData.company

  useEffect(() => {

    if ((name || company) && email && mobile) {
      setQueryData(prev => ({ ...prev, NAME: (name ? name : company), CREATEDBY: name, MODIFYBY: name, EMAIL: email, MOBILE: mobile }))
    }

  }, [(name || company), email, mobile])

  const resetForm = () => {
    setQueryData(prev => ({ ...prev, CREATEDBY: '', MOBILE: '', EMAIL: '', QUERY: '', MODIFYBY: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (userData.name || company)
      setToggle(true)
    else
      setMessage("Login First")

  }


  useEffect(() => {

    const contactUs = async () => {

      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();

        urlencoded.append("NAME", queryData.NAME);
        urlencoded.append("MOBILE", queryData.MOBILE);
        urlencoded.append("QUERY", queryData.QUERY);
        urlencoded.append("MODIFYBY", queryData.MODIFYBY);
        urlencoded.append("CREATEDBY", queryData.CREATEDBY);
        urlencoded.append("EMAIL", queryData.EMAIL);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow"
        };

        const response = await fetch("https://cpointapi.jpsw.in/cpoint/contact", requestOptions)

        if (!response.ok) {
          setError(`HTTP error! Status: ${response.status}`)
        }

        const d = await response.json()
        const m = d.successMessage

        navigate('/messagePage', { state: { message: m, pageNav: -1 } })

      } catch (error) {
        navigate('/messagePage', { state: { message: error, pageNav: -1 } })
      }
    }

    if (toggle && (userData.name || company) ) {
      contactUs()
      setToggle(false)
      resetForm()
    }


  }, [toggle])

  return (
    <div className='pt-2 pb-5 container'>
      <div className="mb-[37px] w-full md:w-[50%] mx-auto">

        <div className='bg-color text-color rounded'>

          <p className='heading-text-size'>Contact Us</p>

          <hr className="w-full h-[1px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
         
          <p className='mt-3 md:mt-0 h-7 text-center mb-2 text-xl text-red-600'>{message}</p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 rounded ">

            <div className="mb-3">
              <label className="block" htmlFor="name">Name</label>
              <input
                type="text"
                id='name'
                placeholder='Name'
                value={(name ? name : company) || ''}
                readOnly
                required
                className="input-field-color capitalize mt-1 p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="mobile">Mobile</label>
              <input
                type="tel"
                id='mobile'
                placeholder='Mobile Number'
                name="MOBILE"
                value={mobile ? mobile : ''}
                required
                readOnly
                maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                className="input-field-color w-full mt-1 py-[10px] px-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder='Email'
                name="EMAIL"
                value={email ? email : ''}
                readOnly
                required
                className="input-field-color w-full mt-1 py-[10px] px-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="description">Query</label>
              <textarea
                id="description"
                name="QUERY"
                value={queryData.QUERY}
                onChange={e => (setQueryData(prev => ({ ...prev, QUERY: e.target.value })))}
                placeholder='Write your query...'
                required
                className="input-field-color capitalize w-full mt-1 p-2 rounded"
                rows="4"
              />
            </div>

            <div className='w-[34%] m-auto my-5'>
              <Button type='submit' className="btn w-full bg-[#0076CE] text-white text-[17px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded py-2">Submit</Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default ContactUs