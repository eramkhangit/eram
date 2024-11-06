import React from 'react'
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
        title: "Task History",
        navigateLink: '/employeeHistory'
    },
    {
        id: 2,
        icon: < FcServices />,
        title: "Service Charges",
        navigateLink: '/employeeServiceCharges'
    },
    {
        id: 1,
        icon: <FcServiceMark />,
        title: "Services",
        navigateLink: '/employeeServices'
    },
    {
        id: 4,
        icon: < PiNotepadDuotone />,
        title: "Complain ",
        navigateLink: '/employeeComplainRedressal'
    }
]

function EmployeeDashboard() {


    return (
        <div>
            <div className='container mb-[85px]'>

                <p className="m-auto heading-text-size border-b-2 border-[#76885B] md:w-[20%] w-[80%]">Employee Dashboard</p>

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

export default EmployeeDashboard