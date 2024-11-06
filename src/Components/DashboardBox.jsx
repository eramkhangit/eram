import React from 'react'
import {Link} from 'react-router-dom'

function DashboardBox({ navigateLink , icon , title}) {
    return (
        <>
            <div  className='hover:bg-[#C1E1C1] flex flex-col justify-center text-center gap-2 w-[44%] md:w-[20%] bg-color p-2 px-1 rounded border-[1px]'>

                <Link to={navigateLink} >

                    <div className='flex justify-center '>
                        <p className="text-7xl md:text-5xl h-auto mb-2">{icon}</p>
                    </div>

                    <div className='text-color text-[16px] overflow-hidden h-[7vh] text-center w-[100%]'>
                        {title}
                    </div>

                </Link>

            </div>
        </>
    )
}

export default DashboardBox