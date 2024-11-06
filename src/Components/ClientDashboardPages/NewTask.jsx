import React, { useState, useEffect, useContext } from 'react'
import Button from '../ButtonComponent'
import Context from '../../Context/createContext';
import { useNavigate } from 'react-router-dom';
import { BsCalendarDateFill } from "react-icons/bs";



function NewTask() {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [services, setServices] = useState([])
    const [orderInfo, setOrderInfo] = useState({
        CID: '',
        // DATE: "",
        SERVICETYPE: '',
        SERVICEDESCRIPTION: '',
        MODIFIEDBY: '',
        CREATEDBY: ''
    })
    const [toggle, setToggle] = useState(false)
    const [message, setMessage] = useState('')
    const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));

    const { userData, loginData } = useContext(Context)

    const navigate = useNavigate()

    const id = userData.id ? userData.id : loginData.id
    const mobile = userData.mobile ? userData.mobile : loginData.mobile
    const clientName = userData.name ? userData.name : loginData.name

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {

        if (clientName && id) {
            setOrderInfo({ ...orderInfo, MODIFIEDBY: clientName, CREATEDBY: clientName, CID: id })
        }

    }, [clientName]);

    // ______________ Services _________________
    useEffect(() => {
        const clientServices = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow',
                };

                const response = await fetch('https://cpointapi.jpsw.in/cpoint/getservices', requestOptions);

                if (!response.ok) {
                    setMessage(`HTTP error! Status: ${response.status}`);
                    setLoading(false); // Set loading to false on error
                    return; // Exit if there’s an error
                }

                const servicesData = await response.json();
                setServices(servicesData);

            } catch (error) {
                setMessage('An error occurred while fetching services.');
            }
        };

        clientServices();

    }, []);

    // ______________ handle Service Option ________
    const handleOptionClick = (s) => {
        setSelected(s.SERVICENAME);
        setIsOpen(false);
        setOrderInfo({ ...orderInfo, SERVICETYPE: s.SERVICENAME })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!orderInfo.SERVICETYPE) {
            setMessage("Select a Service Type"); // Set error if service type is not selected
            return;
        }
        setToggle(true)
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formattedTime = date.toLocaleString('en-US', options);
      
        return `${formattedDate} ${formattedTime}`;
    };

    // ___________ Check it
    useEffect(() => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDateTime = `${month}-${day}-${year}, ${hours}:${minutes}:${seconds}`;
        console.log(formattedDateTime);

        // setCurrentDateTime(formattedDateTime);
    }, []); 

    const handleDateChange = (e) => {
        setDateTime(e.target.value);
    }

    useEffect(() => {

        const addOrder = () => {

            const date = formatDateTime(dateTime)

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("CID", orderInfo.CID);
            urlencoded.append("DATE", date);
            urlencoded.append("SERVICETYPE", orderInfo.SERVICETYPE);
            urlencoded.append("SERVICEDESCRIPTION", orderInfo.SERVICEDESCRIPTION);
            urlencoded.append("MODIFIEDBY", orderInfo.MODIFIEDBY);
            urlencoded.append("CREATEDBY", orderInfo.CREATEDBY);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow"
            };

            fetch("https://cpointapi.jpsw.in/cpoint/addOrder", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    const m = result.successMesage
                    console.log(result);
                    
                    // navigate('/messagePage', { state: { message: m, pageNav: -2 } })
                })
                .catch((error) => 
                    console.log(error)
                    
                    // navigate('/messagePage', { state: { message: error, pageNav: -2 } })
                );
        }

        if (toggle) {
            addOrder()
            setToggle(false)
        }

    }, [toggle])

    return (
        <div>

            <div className='container mb-[85px] mx-auto '>

                <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[40%] md:w-[15%] " >Add Order</p>

                <div className='bg-color md:w-[50%] mx-auto rounded m-3 text-color'>

                    <form id="booking-form" className='p-4 rounded ' onSubmit={handleSubmit}>

                        <p className='mt-1 h-7 text-center mb-2 body-text text-red-600'>{message}</p>

                        <div className="mb-3">
                            <label htmlFor="patient-name" className="caption"> Name</label>
                            <input
                                value={loginData.name ? loginData.name : userData.name}
                                id="patient-name"
                                required
                                readOnly
                                className="mt-1 focus:outline-none input-field-color block w-full p-2 rounded-md"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobile-number" className="block caption ">Mobile Number</label>
                            <input
                                value={mobile}
                                id="mobile-number"
                                maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                                required
                                readOnly
                                className="mt-1 focus:outline-none block input-field-color w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-3 ">
                            <label htmlFor="appointment-date" className="block caption">Date</label>

                            <div className='flex gap-2 bg-color  cursor-pointer rounded bg-[#f2f1f0] py-[4px] '>
                                <input
                                    type="datetime-local"
                                    id="appointment-date"
                                    name="appointment_date"
                                    onChange={handleDateChange}
                                    required
                                    className=" focus:outline-none block w-full px-2 rounded-md"
                                />
                                <BsCalendarDateFill className='text-4xl pr-[4px]' />
                            </div>

                        </div>

                        <div className="relative mb-3 w-[100%] ">
                            <label htmlFor="problem-description" className="block caption">Service Type</label>
                            <button
                                onClick={toggleDropdown}
                                className="w-full mt-1 px-2 py-[10px] border rounded-md input-field-color text-left"
                            >
                                {selected ? selected : "Select Service Type"}
                            </button>
                            {isOpen && (
                                <div id="problem-description" className="absolute z-10 w-full input-field-color  border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {services.map((s) => (
                                        <div
                                            key={s.SERVICE_ID}
                                            onClick={() => handleOptionClick(s)}
                                            className="p-2 hover:bg-gray-300 cursor-pointer"
                                        >
                                            {s.SERVICENAME}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        <div className="mb-3">
                            <label htmlFor="problem-description" className="block caption">Describe your problem</label>
                            <textarea
                                id="problem-description"
                                name="problem_description"
                                onChange={e => setOrderInfo({ ...orderInfo, SERVICEDESCRIPTION: e.target.value })}
                                required
                                className="mt-1 capitalize focus:outline-none block w-full input-field-color p-2 border border-gray-300 rounded-md"
                                rows="4"
                            ></textarea>
                        </div>

                        <div className='py-4'>
                            <Button text={"Add Order"} />
                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
export default NewTask