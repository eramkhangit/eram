
import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const tasks = [
  { id: 1, title: 'AC Repair', date: '10-10-2024', status: 'New', charges: 0 },
  { id: 2, title: 'Carpenter', date: '01-09-2024', status: 'Completed', charges: 150 },
  { id: 3, title: 'Plumber', date: '06-09-2024', status: 'Pending', charges: 0 },
  { id: 4, title: 'Nurse', date: '04-10-2024', status: 'New', charges: 0 },
  { id: 5, title: 'Nurse', date: '04-10-2024', status: 'New', charges: 0 },
];

const History = () => {

  const navigate = useNavigate()
  return (

    <div>
      <div className="container mb-20">

        <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[48%] md:w-[15%] ">Task Lists</p>

        {/* <Button className="btn relative left-[72%] mt-3 mb-2 bg-[#627254] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-3 py-1">
          <Link to={'/newTask'} >Add Task</Link>
        </Button> */}

        <section className='flex flex-col md:flex-row mt-3 flex-wrap items-center justify-center gap-3 md:gap-6'>
          {
            tasks.map((task) => (


              <div key={task.id} className='border-gray-800 py-2 flex gap-2 flex-wrap justify-center items-center w-full md:w-[40%] bg-color rounded border-[1px] '>

                <div className='w-[45%] text-center '>
                  <p className='text-color font-semibold pb-2'>Task :
                    <span className='block text-black font-normal'>{task.title}</span>
                  </p>

                  <p className='text-color font-semibold pb-2'>Date :
                    <span className='block text-black font-normal'>{task.date}</span>
                  </p>

                </div>

                <div className='w-[45%] text-center '>
                  <p className='text-color font-semibold pb-2'>Charges :
                    <span className='block text-red-600 font-normal'>{task.charges}</span>
                  </p>

                  <p className='text-color font-semibold pb-2'>Status :
                    <span className='block text-green-800 font-normal'>{task.status}</span>
                  </p>

                  <Button onClick={() => { navigate('/employeeUpdatePage') }} className="btn bg-[#627254] text-white text-[14px] btn-outline-red-600  hover:border hover:bg-slate-500 rounded px-3 my-4 py-1">Edit</Button>

                </div>

              </div>

            ))
          }
        </section>

      </div>
    </div>

  )
}

export default History