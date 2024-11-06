
import { Button } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../Context/createContext';
import { IoSearchSharp } from "react-icons/io5";
import { BsCalendarDateFill } from "react-icons/bs";

const tasks = [
  {
    id: 1, orderCode: "2452", image: "https://as1.ftcdn.net/v2/jpg/08/93/66/64/1000_F_893666444_IoJMNNbxsFmZ0T7TvP06Ec85pqF5xeCq.jpg", customerMobile: '2323232321', title: 'AC Repair', date: '10:10 AM, 10-10-2024  ', customerName: 'Ramesh', customerMobile: '2323232321', customerAddress: "Betiyahata Gorakhpur", customerProblem: "There is some problem with my AC ,Can you repair it soon"
  },

  {
    id: 2, orderCode: "346", image: "https://as2.ftcdn.net/v2/jpg/01/07/76/33/1000_F_107763373_yDie7KL1mtbvyFnyEMMzaTWoLaUrWvOL.jpg", customerMobile: '2323232321', title: 'Carpenter', date: '12:10 PM,  01-09-2024', customerName: 'Suresh', customerAddress: "Bichhiya Gorakhpur", customerProblem: "You make a dinning table and sofa set within one week"
  },
  {
    id: 3, orderCode: "212", image: "https://plus.unsplash.com/premium_photo-1664301972519-506636f0245d?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", customerMobile: '2323232321', title: 'Plumber', date: '1:10 PM,  06-09-2024', customerName: "Mahesh", customerAddress: "Medical Gorakhpur", customerProblem: "I want plumber team"
  },
  {
    id: 4, orderCode: "233", image: "https://plus.unsplash.com/premium_photo-1664301972519-506636f0245d?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", customerMobile: '2323232321', title: 'Nurse', date: '10:10 AM,  04-10-2024', customerName: "Hitesh", customerAddress: "Jail Bypass Gorakhpur", customerProblem: "I looking for two exprerinced Nurse "
  },
  {
    id: 5, orderCode: "22", image: "https://images.pexels.com/photos/6502552/pexels-photo-6502552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", customerMobile: '2323232321', title: 'Dentist', date: '10:10 AM,  04-10-2024', customerName: "Jigesh", customerAddress: "Betiyahata Gorakhpur", customerProblem: "I want dentist appointment today !"
  },
];

const History = () => {

  const [message, setMessage] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [vendorTasks, setVendorTasks] = useState([])

  const { userData, loginData } = useContext(Context)
  const id = loginData.id ? loginData.id : userData.id

  //  ____________ Not Completed ____________
  const navigate = useNavigate()

  const dateFormate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    console.log('Changed', `${year}-${month}-${day}`);

    return `${year}-${month}-${day}`;
  }

  const vendorSearch = (id, date) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch(`https://cpointapi.jpsw.in/cpoint/vendorTaskSearch?vendorid=${id}&date=${date}`, requestOptions)
        .then((response) => response.json())
        .then(result => {

          if (result.successMessage === "No data found") {
            const m = result.successMessage
            console.log(result)
            setMessage(m)
          } else {
            setVendorTasks(result)
            setMessage('')
          }
          setSearchDate('')

          setTimeout(() => {
            setMessage('')
          }, 2000)

        }
        )

    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (id) {
      vendorSearch(id, searchDate)
    }

  }

  useEffect(() => {

    const vendorHistory = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };

        const response = await fetch(`https://cpointapi.jpsw.in/cpoint/vendorTask?vendorid=${id}`, requestOptions)
        const d = await response.json()

        // ____________ handle API data _______________
        if (d.successMessage === 'No data found') {
          const m = d.successMessage
          setMessage(m)
        } else {
          setVendorTasks(d)
          setMessage('')
        }

      } catch (error) {
        console.log("Vendor Task and History Error : ", error)
      }
    }

    if (id)
      vendorHistory()

  }, [id])


  if (!vendorTasks) {
    return <div>Loading...</div>;
  }

  return (

    <div>

      <div className="container mb-20">

        <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[48%] md:w-[15%] ">Task Lists</p>

        <div className='w-[80%] md:w-[25%] mx-auto pt-4 md:py-6'>

          <form onSubmit={handleSearch}>

            <div className='flex gap-2 '>

              <div className='flex gap-2 cursor-pointer bg-color w-full border-[1px] border-black rounded '>
                <input type="date" name="searchDate"
                  value={searchDate} placeholder='Search Date...' onChange={e => { setSearchDate(e.target.value) }} className='p-2 focus:outline-none w-full bg-color rounded'
                />
                <BsCalendarDateFill className='text-4xl pr-[4px]' />
              </div>

              <button type='submit' className='className="btn bg-[#0076CE] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-3 py-1' >Search</button>

            </div>

          </form>

        </div>

        <p className='mt-3 md:mt-0 h-7 text-center mb-2 text-xl text-red-600'>{message}</p>

        <section className='flex flex-col md:flex-row flex-wrap mt-3 items-center justify-center gap-3 md:gap-6'>

          {
            vendorTasks
            && vendorTasks.map((task, index) =>

            (
              <div key={index} className='border-gray-800 pb-3 pt-3 flex gap-2 flex-wrap justify-center items-center w-full md:w-[40%] max-h-[34vh] md:max-h-[55vh] bg-color rounded border-[1px] '>

                <div className='w-[45%] text-center body-text text-color '>

                  <p className='font-semibold pb-4'>Order Code :
                    <span className='block font-normal'>{task.TASK_SER_ID}</span>
                  </p>

                  <p className='font-semibold pb-4'>Customer :
                    <span className='block font-normal'>{task.NAME}</span>
                  </p>

                  <p className='font-semibold pb-0'>Customer Address :
                    <span className='block font-normal'>{task.ADDRESS}</span>
                  </p>

                </div>

                <div className='w-[45%] text-center body-text text-color'>
                  <p className='font-semibold pb-2'>Task :
                    <span className='block font-normal'>{task.TASKNAME}</span>
                  </p>

                  <p className='font-semibold pb-2'>Date :
                    <span className='block font-normal'>{task.CREATEDON}</span>
                  </p>

                  <Button onClick={() => { navigate('/vendorDetail', { state: task }) }} className="btn bg-[#0076CE] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-2 my-4 py-2">Update Status</Button>

                </div>

              </div>
            )
            )
          }

        </section>

      </div>

    </div>

  )
}

export default History