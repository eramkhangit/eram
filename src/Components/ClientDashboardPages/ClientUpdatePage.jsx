import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Context from '../../Context/createContext';

function ClientUpdatePage() {

  const location = useLocation().state;
  const navigate = useNavigate()

  const { userData, loginData } = useContext(Context)

  const id = userData.id ? userData.id : loginData.id
  const mobile = userData.mobile ? userData.mobile : loginData.mobile


  return (
    <div>

      <div className='container mb-20 pt-2  '>

        <div className="mx-auto rounded-md bg-color md:w-[40%]">

          <p className="mx-auto heading-text-size border-b-2 border-[#76885B] w-[65%]" > Subject : <span>{location.SERVICETYPE}</span></p>

          <div className='my-4 '>

            <form id="booking-form" className='py-3 rounded px-4  text-color ' >

              <div className="mb-3">
                <label htmlFor="vendor-name" className="caption">Order Number:</label>
                <input
                  type="text"
                  value={location.OREDER_NO
                  }
                  id="vendor-name"
                  // name="vendor-name"
                  readOnly
                  className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="vendor-name" className="caption">Client Id :</label>
                <input
                  type="text"
                  value={id}
                  id="vendor-name"
                  // name="vendor-name"
                  readOnly
                  className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="vendor-name" className="caption">Client Name:</label>
                <input
                  type="text"
                  value={loginData.name ? loginData.name : userData.name}
                  id="vendor-name"
                  // name="vendor-name"
                  readOnly
                  className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                />
              </div>

              {/* <div className="mb-3">
                <label htmlFor="vendor-name" className="caption">Client Address:</label>
                <input
                  type="text"
                  value={location.ADDRESS}
                  id="vendor-name"
                  readOnly
                  className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                />
              </div> */}

              <div className="mb-3">
                <label htmlFor="vendor-name" className="caption">Client Mobile Number   :</label>
                <input
                  type="tel"
                  value={mobile}
                  id="vendor-name"
                  readOnly
                  className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="appointment-date" className="block caption">Work Assigned Date:</label>
                <input
                  // type="date"
                  id="appointment-date"
                  value={location.
                    TASK_START_DATE
                  }
                  readOnly
                  className="mt-1 focus:outline-none block input-field-color w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="appointment-date" className="block caption">Charge :</label>
                <input
                  // type="date"
                  id="appointment-date"
                  value={location.SERVICE_CHARGE ? location.SERVICE_CHARGE : 0 }
                  readOnly
                  className="mt-1 focus:outline-none block input-field-color w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-3">
                <label htmlFor="problem-description" className="block caption">Problem Description :</label>
                <p className="mt-1 focus:outline-none block w-full input-field-color p-2 border border-gray-300 rounded-md">
                  {location.DESCRIPTION
                  }
                </p>
              </div>

              <div className='py-8'>

                <button type='button' onClick={() => { navigate(-1) }} className="btn bg-[#627254] text-white heading-text-size hover:border hover:bg-slate-500 rounded px-8 py-2"  >Go Back</button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ClientUpdatePage