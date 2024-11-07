import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Button from './ButtonComponent'
import Context from '../Context/createContext';

function Users() {

    const [selectedOption, setSelectedOption] = useState('');
    const { userData } = useContext(Context)
    const navigate = useNavigate()

    const [message, setMessage] = useState('')

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (e) => {

        e.preventDefault()

        if (selectedOption){
            setMessage('') // change
            navigate('/login', { state: selectedOption })}
        else
            setMessage("Select User Type First")

    }

    useEffect(() => {
        if (userData.dashboardPath)
            navigate(userData.dashboardPath)
        else
            navigate('/')
    }, [userData.dashboardPath , navigate])


    return (

        <div className="container mx-auto pt-2 pb-5">

            <div className="flex justify-center">

                <div className="w-full md:w-[50%]">

                    <div className="bg-color rounded p-6 mb-[70px]">

                        <p className="block heading-text-size ">Select User Type</p>

                        <hr className="w-full h-[1px] mx-auto bg-color border-0 rounded dark:bg-gray-700" />
                        <p className="h-[2vh] pt-2 text-red-600 text-center caption">{message}</p>
                        <form className="space-y-4 pt-8" onSubmit={handleSubmit}>

                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="Vendor"
                                        checked={selectedOption === 'Vendor'}
                                        onChange={handleOptionChange}
                                        className="form-radio "
                                    />
                                    <p className="ml-3 text-color subheading-text-size">Vendor <span className='block'>( Corporate or Individual)</span></p>
                                </label>
                            </div>
                           
                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="Client"
                                        checked={selectedOption === 'Client'}
                                        onChange={handleOptionChange}
                                        className="form-radio"
                                    />
                                    <p className="ml-3 text-color subheading-text-size">Client<span className='block'>( Corporate or Individual)</span></p>
                                </label>
                            </div>

                            <div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="Employee"
                                        checked={selectedOption === 'Employee'}
                                        onChange={handleOptionChange}
                                        className="form-radio "
                                    />
                                    <span className="ml-3 text-color subheading-text-size">Employee</span>
                                </label>

                            </div>
                            <div className='py-4'>
                                <Button text=" Selected" />
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Users