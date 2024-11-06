import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcSerialTasks } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { FcServiceMark } from "react-icons/fc";
import About from '../About'
import DashboardBox from '../DashboardBox';
import Context from '../../Context/createContext';

const homeIcons = [
    {
        id: 1,
        icon: < FcSerialTasks />,
        title: "Task History",
        navigateLink: '/vendorHistory'
    },
    {
        id: 2,
        icon: < FcServices />,
        title: "Service Charges",
        navigateLink: '/vendorServiceCharges'
    },
    {
        id: 3,
        icon: < FcServiceMark />,
        title: "Services",
        navigateLink: '/vendorServices'
    }

]

function VendorDashboard() {

    const [completeTask, setCompleteTask] = useState(null)
     const [totalTask , setTotalTask ] = useState(null)

    const { userData, loginData } = useContext(Context)
    const navigate = useNavigate()
    const id = userData.id ? userData.id : loginData.id

    useEffect(() => {
        const totalTask = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const response = await fetch(`https://cpointapi.jpsw.in/cpoint/totalTask?vendorid=${id}`, requestOptions)
                const d = await response.json()
            
                setTotalTask(d)
               
            } catch (error) {
                console.log(error)
                // navigate('/messagePage', { state: {
                //     message:error , pageNav : -1
                // } })
            }
        }

        if (id) {
            totalTask()
        }

    }, [id])

    useEffect(() => {
        const completeTask = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const response = await fetch(`https://cpointapi.jpsw.in/cpoint/completeTask?vendorid=${id}`, requestOptions)
                const d = await response.json()
                setCompleteTask(d)

            } catch (error) {
                console.log("Error ", error);
            }
        }
        if (id) {
            completeTask()
        }
    }, [id])

    return (
        <div >
            <div className='container mb-[85px] '>

                <p className="m-auto heading-text-size border-b-2 border-[#76885B] md:w-[20%] w-[70%] ">Vendor Dashboard</p>

                <div className='flex items-center justify-center mt-4 w-[100%]'>

                    <div className='w-[45%]'>
                        <div className='px-2 border-[1px] border-black'>
                            <p>Order in Month </p>
                        </div>
                        <div className='px-4 border-[1px] border-black'>
                            <p>{totalTask  ? totalTask : 0 }</p>
                        </div>
                    </div>

                    <div className='w-[45%] '>
                        <div className='px-2 border-[1px] border-black'>
                            <p>Completed</p>
                        </div>
                        <div className='px-4 border-[1px] border-black'>
                        <p>{completeTask ? completeTask : 0 }</p>
                        </div>
                    </div>
                   
                </div>

                <section className='flex flex-row flex-wrap items-center justify-center py-4 gap-4'>

                    {
                        homeIcons.map((item) => (

                            <DashboardBox key={item.id} navigateLink={item.navigateLink} title={item.title} icon={item.icon} />

                        ))
                    }

                </section>

                <About />

            </div>
        </div>
    )
}

export default VendorDashboard