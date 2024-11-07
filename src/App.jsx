
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Users from './Components/Users'
import Footer from './Components/Footer'

import VendorRegistration from './Components/Registration/VendorRegistration'
import ClientRegistration from './Components/Registration/ClientRegistration'
import EmployeRegistration from './Components/Registration/EmployeRegistration'

import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard'
import VendorDashboard from './Components/Dashboard/VendorDashboard'
import ClientDashboard from './Components/Dashboard/ClientDashboard'

import ClientComplainRedressal from './Components/ClientDashboardPages/ComplainRedressal'
import ClientServices from './Components/ClientDashboardPages/Services'
import ClientHistory from './Components/ClientDashboardPages/History'
import ClientServiceCharges from './Components/ClientDashboardPages/ServiceCharges'
import ClientUpdatePage from './Components/ClientDashboardPages/ClientUpdatePage'

import EmployeeComplainRedressal from './Components/EmployeeDashboardPages/ComplainRedressal'
import EmployeeServices from './Components/EmployeeDashboardPages/Services'
import EmployeeHistory from './Components/EmployeeDashboardPages/History'
import EmployeeServiceCharges from './Components/EmployeeDashboardPages/ServiceCharges'
import EmployeeUpdatePage from './Components/EmployeeDashboardPages/EmployeeUpdatePage';

import VendorHistory from './Components/VendorDashboardPages/History'
import VendorServices from './Components/VendorDashboardPages/Services'
import VendorServiceCharges from './Components/VendorDashboardPages/Services&Charges'
import NewTask from './Components/ClientDashboardPages/NewTask'
import { useEffect, useState } from 'react';
import Context from './Context/createContext'
import VendorDetail from './Components/VendorDashboardPages/VendorDetail';
import Service from './Components/Services'
import ContactUs from './Components/ContactUs';
import MessagePage from './Components/MessagePage';

function App() {
  // window.localStorage.clear()

  // _________ Which saved in local storage ________
  const [userData, setUserData] = useState({
    name: '',
    type: '',
    dashboardPath: '',
  })

  const [dashboardPath, setDashboardPath] = useState('')
 const [type , setType ] = useState(null)
  // data after login ____________
  const [loginData, setLoginData] = useState({
    name: '',
    id: '',
    mobile: '',
    company: ''
  })

  // ______________ Data from local storage after page refresh _____________
  useEffect(() => {
    try {
      const nameInfo = JSON.parse(window.localStorage.getItem("User Name"));
      const typeInfo = window.localStorage.getItem("User Type");
      const dashboard = JSON.parse(window.localStorage.getItem("Dashboard Path"));

      // Check if nameInfo is an object and has a 'name' property
      if (nameInfo && typeof nameInfo === 'object' && 'name' in nameInfo) {

        if (typeInfo && dashboard) {
          setUserData({
            name: nameInfo.name || '',
            type: typeInfo || '',
            dashboardPath: dashboard || '',
            id: nameInfo.id || '',  // Default to empty string if undefined
            mobile: nameInfo.mobile || '',
            email: nameInfo.email || '',
            company: nameInfo.company || ''
          });
        } else {
          console.error("User Type or Dashboard Path is missing in localStorage.");
        }

      } else {
        console.error("Invalid User Name structure in localStorage.");
      }

    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
    }

  }, []);


  const contextValue = {
    setUserData,
    userData,
    loginData,
    setLoginData,
    setDashboardPath,
    dashboardPath,
    type,
    setType
  }

  return (
    <>
      <Context.Provider value={contextValue} >

        <Navbar />
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newTask' element={<NewTask />} />
          <Route path='/messagePage' element={<MessagePage />} />
  
        {/* _______________ Registration Pages ___________ */}
          <Route path='/clientRegistration' element={<ClientRegistration />} />
          <Route path='/vendorRegistration' element={<VendorRegistration />} />
          <Route path='/employeeRegistration' element={<EmployeRegistration />} />

          {/* _____________ Dashboard ___________ */}
          <Route path='/employeeDashboard' element={<EmployeeDashboard />} />
          <Route path='/clientDashboard' element={<ClientDashboard />} />
          <Route path='/vendorDashboard' element={<VendorDashboard />} />

          {/* ___________ Dashboard Page (Client) ____________ */}
          <Route path='/clientServices' element={<ClientServices />} />
          <Route path='/clientServiceCharges' element={<ClientServiceCharges />} />
          <Route path='/clientHistory' element={<ClientHistory />} />
          <Route path='/clientComplainRedressal' element={<ClientComplainRedressal />} />
          <Route path='/clientUpdatePage' element={<ClientUpdatePage />} />

          {/* _______________ Dashboard Page (Employee) _____________ */}
          <Route path='/employeeHistory' element={<EmployeeHistory />} />
          <Route path='/employeeServices' element={<EmployeeServices />} />
          <Route path='/employeeServiceCharges' element={<EmployeeServiceCharges />} />
          <Route path='/employeeComplainRedressal' element={<EmployeeComplainRedressal />} />
          <Route path='/employeeUpdatePage' element={<EmployeeUpdatePage />} />


          {/* ______________ Dashboard Page (Vendor) _______________ */}
          <Route path='/vendorHistory' element={<VendorHistory />} />
          <Route path='/vendorServices' element={<VendorServices />} />
          <Route path='/vendorServiceCharges' element={<VendorServiceCharges />} />
          <Route path='/vendorDetail' element={<VendorDetail />} />

          <Route path='/service' element={<Service />} />
          <Route path='/contactus' element={<ContactUs />} />

        </Routes>
        <Footer />

      </Context.Provider>
    </>
  )
}

export default App