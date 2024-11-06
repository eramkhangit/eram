import React, { useState, useEffect } from 'react';
import { GiAutoRepair, GiNurseFemale, GiTap } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoWomanSharp } from "react-icons/io5";
import { PiCookingPotFill } from "react-icons/pi";
import { MdMan } from "react-icons/md";
import { AiFillFormatPainter } from "react-icons/ai";

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const clientServices = async () => {
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const response = await fetch("https://cpointapi.jpsw.in/cpoint/getservices", requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const servicesData = await response.json();
        setServices(servicesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    clientServices();
  }, []);

  return (
    <div className='pt-2 pb-5 container'>
      <div className='mb-[40px] text-color rounded w-full md:w-[80%] mx-auto'>
        <div className="text-center px-8 py-3">
          <p className="m-auto heading-text-size border-b-2 border-[#76885B] w-[40%]">Services</p>

          {loading && <p className="text-3xl font-semibold pt-6">Loading services...</p>} {/* Loading message */}

          {error && <p className="text-red-500">{error}</p>} {/* Error message */}

          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex flex-col items-center bg-color border border-gray-300 rounded-lg md:w-[90%] p-4 hover:scale-105 transition-transform">
                   <p className="w-[36%] text-3xl md:text-5xl h-auto mb-2"><GiAutoRepair/></p>
                  <h3 className="text-lg font-semibold">{service.SERVICENAME}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
