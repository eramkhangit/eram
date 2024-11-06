import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoSettings } from "react-icons/io5";
import { RiUser3Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import '../App.css'
import Context from '../Context/createContext';

function Footer() {

    // same save side nav
    const { userData, loginData, dashboardPath } = useContext(Context)
    const id = userData.id ? userData.id : loginData.id
    const dashboard = userData.dashboardPath ? userData.dashboardPath : dashboardPath

    return (
        <div className="fixed bg-slate-50 py-1 left-0 bottom-0 w-full shadow-slate-200 shadow-sm">

            <div className=' flex justify-evenly pb-3 pt-1 items-center'>

                <div className='w-[24%] footer flex flex-col items-center' >
                    <p >Dashboard</p>
                    <Link to={dashboard ? dashboard : '/'} className='text-[21px]'><MdDashboard /></Link>
                </div>

                <div className='w-[24%] footer flex flex-col items-center' >
                    <p >User Type</p>
                    <Link to={dashboard || id ? dashboard : '/'} className='text-[21px]'><RiUser3Fill /></Link>
                </div>

                <div className='w-[24%] footer flex flex-col items-center' >
                    <p >Contact Us</p>
                    <Link to={id ? '/contactus' : '/'} className='text-2xl'> <MdPermContactCalendar /></Link>
                </div>

                <div className='w-[24%] footer flex flex-col items-center' >
                    <p >Service</p>
                    <Link to={'/service'} className='text-2xl'><IoSettings /></Link>
                </div>

            </div>

            {/* <Divider className='pt-1 text-[#76885B] text-[12px]'>@copyright2024</Divider> */}

        </div>
    )
}

export default Footer