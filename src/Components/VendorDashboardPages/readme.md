___________ Formate date _________
import React, { useState, useEffect } from 'react';

const DateInput = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setCurrentDate(formattedDate);
  }, []);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-GB', options).replace(',', '');
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value); // Update the state with the selected date
  };

  return (
    <div>
      <label htmlFor="date">Select Date:</label>
      <input 
        type="text" 
        id="date" 
        value={currentDate} 
        onChange={handleDateChange} 
      />
    </div>
  );
};

export default DateInput;

<!-- vendor search -->
const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("https://192.168.1.7:45455/cpoint/vendorTaskSearch?vendorid=1&date=2024-10-19", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));



<!-- Vendor Status Update -->
const formdata = new FormData();
formdata.append("TASK_SER_ID", "3");
formdata.append("COMMENT_VENDOR", "comment");
formdata.append("TASK_STATUS", "process");
formdata.append("TASK_START_DATE", "11-02-2024");

const requestOptions = {
  method: "PUT",
  body: formdata,
  redirect: "follow"
};

fetch("http://192.168.1.11:45455/cpoint/vendorStatus", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));