import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from '../UtilityFun/stringCapitalize'
import Button from "../ButtonComponent";

const vendorType = [{
    id: 1,
    type: 'Corporate'
},
{
    id: 2,
    type: 'Individual'
}]

function VenderRegistration() {

    const [vendorRegistration, setVendorRegistration] = useState({
        NAME: '',
        COMPANY_NAME: '',
        FATHERNAME: '',
        ADDRESS: '',
        GSTNO: '',
        DOB: '',
        DOI: '',
        MOBILE: '',
        GENDER: '',
        VENDOR_TYPE: '',
        EMAIL: '',
        PASSWORD: '',
        CREATEDBY: '',
        MODIFIEDBY: ''
    });

    const [checkAge, setCheckAge] = useState('')
    const [toggle, setToggle] = useState(false)
    const [selectionType, setSelectionType] = useState('')

    const navigate = useNavigate()

    // _____________ Type Selection _________
    const handleSelectType = (e) => {

        const type = e.target.value
        setSelectionType(type)
        setVendorRegistration({ ...vendorRegistration, VENDOR_TYPE: type })

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorRegistration((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // _____________ Check Vendor Age ___________
    // useEffect(() => {
    //     if (vendorRegistration.DOB) {

    //         if (vendorRegistration.DOB > 18)
    //             return; // Vendor is valid
    //         else
    //             return setCheckAge("You are not Eligible! "); // Vendor is not valid
    //     }

    // }, [vendorRegistration.DOB])

    // __________ handle form submit ___________
    const handleSubmit = (e) => {
        e.preventDefault();
        setToggle(p => !p)
    };

    // ________________ Capitalize String First Letter______________
    useEffect(() => {

        if (vendorRegistration.NAME || vendorRegistration.COMPANY_NAME) {
            const capitalizedString = capitalizeWords(vendorRegistration.NAME);
            setVendorRegistration({ ...vendorRegistration, NAME: capitalizedString, MODIFIEDBY: capitalizedString, CREATEDBY: capitalizedString });

        }

    }, [vendorRegistration.NAME || vendorRegistration.COMPANY_NAME]);

    // ______________ Handle Vendor Registration Form  ___________
    useEffect(() => {

        const vendorRegister = async () => {

            try {

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                const urlencoded = new URLSearchParams();

                // Dynamically append fields from the vendorRegistration object
                for (const [key, value] of Object.entries(vendorRegistration)) {
                    urlencoded.append(key, value);
                }

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: "follow"
                };

                const response = await fetch("https://cpointapi.jpsw.in/cpoint/addvendor", requestOptions)

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
                }
                const d = await response.json()
                const m = d.successMessage
                console.log(d);

                navigate('/messagePage', {
                    state: {
                        message: m, pageNav: -1
                    }
                })

            } catch (error) {
                console.log(error);
            }

        }

        if (toggle) {
            vendorRegister()
            setToggle(false)
            // setCheckAge('')
            // setCorporateOpen(false)
            // setIndividualOpen(false)
        }

    }, [toggle])


    return (
        <div className="container mx-auto pt-2 pb-5">
            <div className="flex justify-center">
                <div className="mb-[60px] w-full md:w-8/12">
                    <div className="bg-color text-color rounded p-4">

                        <p className="heading-text-size ">Vendor Form</p>

                        <hr className="w-full h-[1px] mx-auto bg-color border-0 rounded dark:bg-gray-700 mb-4" />

                        {/* <p className='mt-1 h-7 text-center mb-2 body-text text-red-600'>{checkAge}</p> */}

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* ________ Type Selection ___________ */}
                            <div>
                                <label htmlFor="vendor-select" className="caption hover:outline-none w-full border-none ">Select Vendor Type:</label>
                                <select
                                    id="vendor-select"
                                    value={vendorRegistration.VENDOR_TYPE}
                                    onChange={handleSelectType}
                                    className="input-field-color py-3 px-2" required
                                >
                                    <option value="" className="">Please choose an option</option>
                                    {vendorType.map(vendor => (
                                        <option key={vendor.id} value={vendor.type} >
                                            {vendor.type}
                                        </option >
                                    ))}
                                </select>

                            </div>

                            {
                                selectionType === 'Corporate'
                                &&
                                (<div>
                                    <input
                                        type="text"
                                        name="COMPANY_NAME"
                                        value={vendorRegistration.COMPANY_NAME}
                                        onChange={handleChange}
                                        required
                                        placeholder='Company Name'
                                        className="py-3 px-2 input-field-color capitalize "
                                    />
                                </div>)
                            }

                            {selectionType === 'Individual' &&
                                (
                                    <div>
                                        <input
                                            type="text"
                                            name="NAME"
                                            value={vendorRegistration.NAME}
                                            onChange={handleChange}
                                            required
                                            placeholder='Vendor Name'
                                            className="py-3 px-2 input-field-color capitalize "
                                        />
                                    </div>
                                )
                            }

                            <div>
                                <input
                                    type="text"
                                    name="ADDRESS"
                                    value={vendorRegistration.ADDRESS}
                                    onChange={handleChange}
                                    required
                                    placeholder='Address'
                                    className="py-3 px-2 input-field-color capitalize "
                                />
                            </div>

                            {/* __________ Corporate GSTN ___________ */}
                            {selectionType === 'Corporate' &&
                                <div>
                                    <input
                                        type="text"
                                        name="GSTNO"
                                        maxLength={15}
                                        value={vendorRegistration.GSTNO}
                                        onChange={handleChange}
                                        required
                                        title="Enter GST Number"
                                        placeholder='GST Number'
                                        className="py-3 px-2 input-field-color "
                                    />
                                </div>
                            }

                            {/* _____________ Individual Father Name ___________ */}
                            {selectionType === 'Individual' &&
                                (<div >
                                    <input
                                        type="text"
                                        name="FATHERNAME"
                                        value={vendorRegistration.FATHERNAME}
                                        onChange={handleChange}
                                        required
                                        placeholder='Father Name'
                                        className="py-3 px-2 input-field-color capitalize "
                                    />
                                </div>)
                            }

                            <div>
                                <input
                                    type="tel"
                                    name="MOBILE"
                                    maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                                    value={vendorRegistration.MOBILE}
                                    onChange={handleChange}
                                    required
                                    placeholder='Mobile Number'
                                    className="py-3 px-2 input-field-color "
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="EMAIL"
                                    // title="Mobile number must be 10 digits, Charactors not acceptable"
                                    value={vendorRegistration.EMAIL}
                                    onChange={handleChange}
                                    required
                                    placeholder='Email'
                                    className="py-3 px-2 input-field-color"
                                />
                            </div>

                            <div>
                                <input type="password" name="PASSWORD" placeholder="Password"
                                    onChange={handleChange}
                                    required value={vendorRegistration.PASSWORD} className="py-3 px-2 input-field-color" maxLength={'10'} />
                            </div>

                            {/* _____________ Corporate DOI _____________ */}
                            {selectionType === 'Corporate' &&
                                <div>
                                    <label htmlFor="birthdayDate" className="block caption">Date of Firm :</label>

                                    <input
                                        type="date"
                                        id="birthdayDate"
                                        name="DOI"
                                        className="py-3 px-2 input-field-color"
                                        onChange={handleChange}
                                        required value={vendorRegistration.DOI}
                                    />
                                </div>
                            }

                            {/* ____________ Individual DOB ___________ */}
                            {selectionType === 'Individual' &&
                                (<div>
                                    <label htmlFor="birthdayDate" className="block caption">Date of Birth :</label>

                                    <input
                                        type="date"
                                        id="birthdayDate"
                                        name="DOB"
                                        className="py-3 px-2 input-field-color"
                                        onChange={handleChange}
                                        required value={vendorRegistration.DOB}
                                    />
                                </div>)
                            }

                            {/* _____________ Individual Gender _____________ */}
                            {selectionType === 'Individual' &&
                                (
                                    <div className="w-full md:w-1/2" >
                                        <h6 className=" text-md caption">Gender:</h6>
                                        <div className="flex flex-wrap ">
                                            <div className="flex gap-4">
                                                {['female', 'male', 'other'].map(gender => (
                                                    <label key={gender} className="flex items-center">
                                                        <input
                                                            required
                                                            className="form-radio"
                                                            type="radio"
                                                            name="GENDER"
                                                            value={gender}
                                                            checked={vendorRegistration.GENDER === gender}
                                                            onChange={handleChange}
                                                        />
                                                        <span className="ml-2 capitalize">{gender}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="py-4 ">
                                <Button text="Sign Up" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VenderRegistration;
