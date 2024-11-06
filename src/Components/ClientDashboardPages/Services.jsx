import React from 'react'
import Button from '../../Components/ButtonComponent'

const services = [
  { name: 'AC Repair', description: 'Expert AC repair and maintenance services.' },
  { name: 'Carpenter', description: 'Professional carpentry services for all your needs.' },
  { name: 'Plumber', description: 'Reliable plumbing services for residential and commercial needs.' },
  { name: 'Nurse', description: 'Qualified nursing services available at your convenience.' },
  { name: 'Doctor', description: 'Consult with experienced doctors for your healthcare needs.' },
];

const Services = () => {

  return (

    <div>
      <div className="container mb-20 ">

        <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[50%] md:w-[15%]">Our Services</p>

        <div className='flex justify-evenly w-full md:w-[50%] md:m-auto gap-2 mt-4 '>
          <Button text={"Health Service"} />
          <Button text={"Other Service"} />
        </div>


        <div className='mx-auto md:w-[60%]'>
          <ul className="space-y-4 py-4">

            {
              services.map((service, index) => (
                <li key={index} className="bg-color text-color shadow-sm rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="caption pb-2 font-semibold">{service.name}</h2>
                  <p className="text-color body-text">{service.description}</p>
                </li>
              ))
            }

          </ul>
        </div>

      </div>
    </div>

  )
}

export default Services