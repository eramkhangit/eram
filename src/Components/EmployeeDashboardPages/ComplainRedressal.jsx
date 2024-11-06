import React, { useState } from 'react'
import Button from '../ButtonComponent';
import { useNavigate } from 'react-router-dom';

const serviceType = [
  {
    id: 2,
    service: "AC Repair"
  },
  {
    id: 3,
    service: "Plumber"
  },
  {
    id: 4,
    service: "Nurse"
  },
  {
    id: 5,
    service: "Dentist"
  },
  {
    id: 6,
    service: "Electrition"
  },
  {
    id: 7,
    service: "Moter Mechanic"
  },
  {
    id: 8,
    service: "AC Repair"
  },
  {
    id: 9,
    service: "Plumber"
  },
  {
    id: 10,
    service: "Nurse"
  },
  {
    id: 11,
    service: "Dentist"
  },

]


const ComplainRedressal = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    date: '',
    serviceType: 'service1',
    description: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  // const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ______________ handle Service Option ________
  const handleOptionClick = (service) => {
    setSelected(service.service);
    setFormData(prev => ({ ...prev, serviceType: service.service }))
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Complaint Form submitted')
    setFormData(prev => ({ ...prev, name: '', mobile: '', email: '', date: '', serviceType: '', description: '' }))
    // console.log('Form submitted:', formData);
  };

  return (
    <div>

      <div className="container mb-[95px]">

        <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[60%] md:w-[20%] ">Complaint Form</p>

        <div className='bg-color md:w-[40%] mx-auto rounded m-3 text-color'>

          {/* <p className='pt-3 pb-4 h-7 text-center body-text text-red-600'>{message}</p> */}

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 rounded ">

            <div className="mb-3">
              <label className="block" htmlFor="name">Complainant Name</label>
              <input
                type="text"
                placeholder='Complainant Name'
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field-color mt-1 focus:outline-none p-2 w-full rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                maxLength={10} pattern="\d{10}" title="Mobile number must be 10 digits, Charactors not acceptable"
                placeholder='Mobile Number'
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="input-field-color w-full mt-1 focus:outline-none p-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder='Email'
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field-color w-full mt-1 focus:outline-none py-[10px] px-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="input-field-color w-full mt-1 focus:outline-none py-[10px] px-2 rounded"
              />
            </div>


            <div className="relative mb-3 w-[100%] ">
              <label htmlFor="problem-description" className="block mb-1">Service Type</label>
              <button
                onClick={toggleDropdown}
                className="w-full p-2 border rounded-md input-field-color text-left"
              >
                {selected ? selected : "Select an option"}
              </button>
              {isOpen && (
                <div id="problem-description" className="absolute z-10 w-full input-field-color border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {serviceType.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleOptionClick(service)}
                      className="p-2 hover:bg-gray-300 cursor-pointer"
                    >
                      {service.service}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="block" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="input-field-color w-full mt-1 focus:outline-none p-2 rounded"
                rows="4"
              />
            </div>

            <div className='py-4'>
              <Button text={"Submit"} />
            </div>

          </form>

        </div>

      </div>
    </div>

  )
}

export default ComplainRedressal