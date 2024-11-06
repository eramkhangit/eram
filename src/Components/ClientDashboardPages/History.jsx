
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import Context from '../../Context/createContext';
import axios from 'axios';
import { BsCalendarDateFill } from "react-icons/bs";



const History = () => {

  const [clientOrder, setClientOrder] = useState(null)
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const { userData, loginData } = useContext(Context)

  const id = userData.id ? userData.id : loginData.id

  useEffect(() => {
    const clientOrder = async () => {
      // http://192.168.1.11:45455
      try {
        const response = await axios.get(`https://cpointapi.jpsw.in/cpoint/clientOrder`, {
          params: { clientid: id },
        });

        if (response.data.successMessage === 'No data found') {
          const m = response.data.successMessage
          setMessage(m)
        } else {
          setMessage('')
          setClientOrder(response.data);
        }

      } catch (error) {
        console.log(error)
        // setError(error); 
      }
    };

    if (id) {
      clientOrder();
    }

  }, [id]);

  // ____________ Search __________
  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (

    <div>
      <div className="container mb-20 ">

        <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[48%] md:w-[15%]">Order Lists</p>

        <div className='w-[80%] md:w-[25%] mx-auto pt-4 md:py-6'>

          <form onSubmit={handleSearch}>

            <div className='flex gap-2 '>

              <div className='flex gap-2 cursor-pointer bg-color w-full border-[1px] border-black rounded '>
                <input type="date" name="searchDate"
                  // value={searchDate} 
                  // onChange={e => { setSearchDate(e.target.value) }} 
                  placeholder='Search Date...'
                  className='p-2 focus:outline-none w-full bg-color rounded'
                />
                <BsCalendarDateFill className='text-4xl pr-[4px]' />
              </div>

              <button type='submit' className='className="btn bg-[#0076CE] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-3 py-1' >Search</button>

            </div>

          </form>

        </div>

        <Button className="btn relative left-[72%] mt-3 mb-2 bg-[#0076CE] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-3 py-2">
          <Link to={'/newTask'} >Add Order</Link>
        </Button>

        <section className='flex flex-col md:flex-row flex-wrap items-center justify-center gap-3 md:gap-6'>
          {

            message
              ?
              < p className='text-center text-xl text-red-600 '>{message} </p>
              :
              (
                clientOrder
                &&
                clientOrder.map((order, index) => (

                  <div key={index} className='border-gray-800 py-2 flex gap-2 flex-wrap justify-center items-center w-full md:w-[40%] bg-color rounded border-[1px] '>

                    <div className='w-[45%] text-center '>

                      <Button onClick={() => { navigate('/clientComplainRedressal', { state: order }) }} className="btn bg-[#0076CE] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-3 my-4 py-2">complain</Button>

                      <p className='text-color font-semibold pb-2'>Order :
                        <span className='block text-black font-normal'>{order.TASKNAME}</span>
                      </p>

                      <p className='text-color font-semibold pb-2'>Date :
                        <span className='block text-black font-normal'>{order.DATE
                        }</span>
                      </p>

                    </div>

                    <div className='w-[45%] text-center '>
                      <p className='text-color font-semibold pb-2'>Charges :
                        <span className='block text-red-600 font-normal'>{order.SERVICE_CHARGE ? order.SERVICE_CHARGE : 0}</span>
                      </p>

                      <p className='text-color font-semibold pb-2'>Status :
                        <span className='block text-green-800 font-normal'>{order.STATUS

                        }
                        </span>
                      </p>

                      <Button onClick={() => { navigate('/clientUpdatePage', { state: order }) }} className="btn bg-[#0076CE] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-3 my-4 py-2">Detail</Button>

                    </div>

                  </div>

                )))

          }
        </section>

      </div>
    </div >

  )
}

export default History