import React from 'react'
import { Link } from 'react-router-dom'
import { FcSerialTasks } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { FcServiceMark } from "react-icons/fc";
import { PiNotepadDuotone } from "react-icons/pi";
import About from '../About'
import DashboardBox from '../DashboardBox';

const homeIcons = [
    {
        id: 3,
        icon: < FcSerialTasks />,
        title: "Order & History",
        navigateLink: '/clientHistory'
    },
    {
        id: 2,
        icon: < FcServices />,
        title: "Service Charges",
        navigateLink: '/clientServiceCharges'
    },
    {
        id: 1,
        icon: <FcServiceMark />,
        title: "Services",
        navigateLink: '/clientServices'
    },
    // {
    //     id: 4,
    //     icon: < PiNotepadDuotone />,
    //     title: "Complaint Status",
    //     navigateLink: '/clientComplainRedressal'
    // }
]


function ClientDashboard() {

    return (
        <div className=''>
            <div className='container mb-[85px]'>

                <p className="w-[65%] md:w-[20%] m-auto heading-text-size border-b-2 border-[#76885B] ">Client Dashboard</p>


                <section className='flex flex-row flex-wrap items-center justify-center py-5 gap-4'>

                    {
                        homeIcons.map((item) => (

                            <DashboardBox key={item.id} navigateLink={item.navigateLink} title={item.title} icon={item.icon} />

                        ))
                    }

                </section>

                {/* __________ About Us ___________ */}
                <About />

            </div>
        </div>
    )
}

export default ClientDashboard