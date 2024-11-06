import React, { useContext, useEffect, useState } from 'react'
import Button from '../ButtonComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import Context from '../../Context/createContext'

const status = [
    {
        id: 2,
        type: "Pending",
    },
    {
        id: 3,
        type: "Process",
    },
    {
        id: 4,
        type: "Completed",
    }
]

function VendorDetail() {

    const [vendorUpdate, setVendorUpdate] = useState({
        COMMENT_VENDOR: '',
        TASK_STATUS: '',
        TASK_START_DATE: ''
    })
    const [toggle, setToggle] = useState(false)
    const location = useLocation().state

    const { loginData, userData } = useContext(Context)

    const id = loginData.id ? loginData.id : userData.id
    const navigate = useNavigate()

    const formattedDate = (date) => {
        const [year, month, day] = date.split('-')
        return `${month}-${day}-${year}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setToggle(true)
    }
    
    useEffect(() => {
        const vendorComment = async () => {
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            
            const date = formattedDate(vendorUpdate.TASK_START_DATE)
            console.log(date , vendorUpdate.COMMENT_VENDOR , vendorUpdate.TASK_STATUS ,id);

            const urlencoded = new URLSearchParams();
            urlencoded.append("TASK_SER_ID", id);
            urlencoded.append("COMMENT_VENDOR", vendorUpdate.COMMENT_VENDOR);
            urlencoded.append("TASK_STATUS", vendorUpdate.TASK_STATUS);
            urlencoded.append("TASK_START_DATE", date);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow"
            };

            fetch("https://cpointapi.jpsw.in/cpoint/vendorStatus", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));

        };

        if (toggle && id) {
            vendorComment();
            setToggle(false);
        }

    }, [toggle, vendorUpdate, id]);


    return (
        <div>

            <div className='container mb-20 pt-2  '>

                <div className="mx-auto rounded-md bg-color md:w-[40%]">

                    <p className="mx-auto heading-text-size border-b-2 border-[#76885B] w-[65%]" > Subject : <span>{location.TASKNAME}</span></p>

                    <div className='my-4 '>

                        <form id="booking-form" className='py-3 rounded px-4  text-color ' onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="vendor-name" className="caption">Order Number:</label>
                                <input
                                    type="text"
                                    value={location.TASK_SER_ID
                                    }
                                    id="vendor-name"
                                    readOnly
                                    className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="vendor-name" className="caption">Customer Code :</label>
                                <input
                                    type="text"
                                    value={location.CLIENT_ID}
                                    id="vendor-name"
                                    readOnly
                                    className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="vendor-name" className="caption">Customer Name:</label>
                                <input
                                    type="text"
                                    value={location.NAME}
                                    id="vendor-name"
                                    readOnly
                                    className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="vendor-name" className="caption">Customer Address:</label>
                                <input
                                    type="text"
                                    value={location.ADDRESS}
                                    id="vendor-name"
                                    readOnly
                                    className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="vendor-name" className="caption">Customer Mobile Number   :</label>
                                <input
                                    type="tel"
                                    value={location.MOBILE}
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
                                        CREATEDON
                                    }
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

                            <div className='mt-3 rounded-md bg-color'>
                                <label className="block caption">Picture :</label>
                                <div >
                                    <img src={location.IMAGE} alt="No Image" className='rounded-md' />
                                </div>
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="status-type" className="caption hover:outline-none w-full border-none ">Status :</label>
                                <select
                                    required
                                    id="status-type"
                                    value={vendorUpdate.TASK_STATUS}
                                    onChange={e => setVendorUpdate(prev => ({ ...prev, TASK_STATUS: e.target.value }))}
                                    className="hover:outline-none focus:outline-none input-field-color w-full mt-1 px-2 py-[9px] border-none rounded-md "
                                >
                                    <option value="" className="caption"> {vendorUpdate.TASK_STATUS ? vendorUpdate.TASK_STATUS : location.STATUS} </option>

                                    {status.map(s => (
                                        <option key={s.id} value={s.type} className='caption'>
                                            {s.type}
                                        </option >
                                    ))}

                                </select>

                            </div>

                            <div className='mt-3' >

                                <label htmlFor="vendor-date" className="block caption">Task Start Date :</label>
                                <input type="date" name="TASK_START_DATE" className="mt-1 focus:outline-none block input-field-color w-full p-2 border border-gray-300 rounded-md" id="vendor-date"
                                    value={vendorUpdate.TASK_START_DATE}
                                    onChange={e => setVendorUpdate(prev => ({ ...prev, TASK_START_DATE: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className='mt-3'>

                                <label htmlFor="vendor-comment" className="caption hover:outline-none w-full border-none ">Vendor Comment :</label>
                                <textarea
                                    id="vendor-comment"
                                    // name="QUERY"
                                    value={vendorUpdate.COMMENT_VENDOR}
                                    onChange={e => setVendorUpdate(prev => ({ ...prev, COMMENT_VENDOR: e.target.value }))}
                                    required
                                    placeholder='Vendor Comment Here...'
                                    className="input-field-color w-full mt-1 p-2 rounded"
                                    rows="4"
                                />

                            </div>


                            <div className='pt-5 pb-5'>
                                <Button text={"Update"} />
                            </div>

                        </form>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default VendorDetail