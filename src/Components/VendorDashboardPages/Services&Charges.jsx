import React, { useState, useEffect } from 'react';

const ServiceCharges = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const clientServices = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        const response = await fetch('https://cpointapi.jpsw.in/cpoint/getservices', requestOptions);

        if (!response.ok) {
          setError(`HTTP error! Status: ${response.status}`);
          setLoading(false); // Set loading to false on error
          return; // Exit if there’s an error
        }

        const servicesData = await response.json();
        setServices(servicesData);
      } catch (error) {
        setError('An error occurred while fetching services.');
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    clientServices();
  }, []);

  return (
    <div>
      <div className="container mb-20 ">
        <h1 className="m-auto heading-text-size border-b-2 border-[#76885B] w-[72%] md:w-[20%] ">Service & Charges </h1>

        {loading && <p className='mt-3 h-7 text-center text-xl font-semibold mb-2 '>Loading...</p>} {/* Loading message */}
        {error && <p className='mt-3 h-7 text-center mb-2 body-text text-red-600'>{error}</p>} {/* Error message */}

        <div className='md:w-[60%] mx-auto '>
          <ul className="py-4 space-y-4">
            {
              services.map((service, index) => (
                <li key={index} className="items-center flex justify-between p-2 bg-color shadow-sm text-color rounded-lg hover:shadow hover:shadow-blue-700 transition-shadow duration-300">
                  <h2 className="subheading-text-size w-[35%] md:w-[40%] text-center pb-2 ">{service.SERVICENAME}</h2>
                  <p className="text-red-600 w-[50%]">Charges: {service.CHARGE}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ServiceCharges;
