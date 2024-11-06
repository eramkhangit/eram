
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function MessagePage() {

    const location = useLocation().state
   
    const navigate = useNavigate()

    return (

        <div className="container mx-auto pt-2 pb-5">

            <div className="flex justify-center">

                <div className="w-full md:w-[50%]">


                    <div className="bg-color rounded px-3 mt-10 font-semibold mb-[270px]">


                        <p className='heading-text-size'>Message</p>

                        <hr className="w-full h-[1px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />

                        <div className='py-6'>

                            <p className="block text-2xl ">{location.message ? location.message : 'Message...'} </p>

                            <div className='py-8'>

                                <button type='button' onClick={() => { navigate(location.pageNav) }} className="btn bg-[#0076CE] text-white heading-text-size hover:border hover:bg-slate-500 rounded px-8 py-2"  >Go Back</button>

                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    )
}

export default MessagePage