<!-- Navbar -->

import React, { useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from './Image/logo2.png'
import { useContext } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material'
import Context from '../Context/createContext';
import { Offcanvas as COffcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody, CloseButton as CCloseButton } from 'react-bootstrap';

import {
    Card,
    List,
    ListItem,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


function Navbar() {

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()
    const { setUserData, userData } = useContext(Context)

    // ________________ Dashboard Check ____________
    const handleDashboardLink = () => {

        switch (userData.type) {
            case 'Vendor':
                navigate('/vendorDashboard');
                break;
            case 'Client':
                navigate('/clientDashboard');
                break;
            case 'Employee':
                navigate('/employeeDashboard');
                break;
            default:
                navigate('/');
                break;
        }
        setVisible(false)
    }

    const handleLinkClick = () => {
        setVisible(false)
    }

    // __________________ Logout User______________
    const logoutUser = () => {
        window.localStorage.removeItem("User Name")
        window.localStorage.removeItem("User Type")
        window.localStorage.removeItem("Dashboard Path")

        setUserData(() => ({ name: '', type: '' , dashboardPath : ''}))

        navigate('/')

        setVisible(false)

    }

    return (

        <div className='bg-slate-50'>

            <div className='flex pt-4 user-text justify-center gap-4  items-center text-lg'>

                <p >
                    {
                        userData.name.Name
                            ?
                            <span className='user-text'> {userData.name.Name}</span>
                            :
                            <span className='user-text' >{userData.name}</span>
                    }
                </p>

                <Badge badgeContent={4} color="primary">
                    <NotificationsIcon sx={{ color: '#76885B' }} />
                </Badge>

            </div>

            <nav className='flex items-center justify-between shadow-sm shadow-slate-200 px-4'>

                <Link to='/' className='w-[30%] h-[3.4rem] md:w-[10%] md:h-[20px]'>
                    <img src={Logo} className='w-[100%] h-[80%] pt-3 ' alt="Logo" />
                </Link>

                {/* __________ Menu Button ____________ */}
                <button
                    className=""
                    type="button"
                    onClick={() => setVisible(true)}
                >
                    <IoIosMenu className='text-5xl font-semibold text-[#76885B]' />
                </button>

                {/* _____________ Dekstop Menu ___________ */}
                {/* <AppBar>

                    <Container maxWidth="xl" >

                          <Toolbar disableGutters>

                          </Toolbar>

                    </Container>

                   </AppBar> */}

            </nav>

            {/* ______________ Responsive Menu __________ */}
            <COffcanvas show={visible} onHide={() => setVisible(false)} placement="start" className="max-w-[65%] border-red-600">

                <OffcanvasHeader className='h-[13vh] '>
                    <OffcanvasTitle className='text-2xl'>C Point</OffcanvasTitle>
                    <CCloseButton className="text-reset text-xl" onClick={() => setVisible(false)} />
                </OffcanvasHeader>

                <OffcanvasBody className='px-2 py-3 bg-color '>

                    <Card className=" w-full shadow-none bg-[#DDDDDD] ">

                        <List className='p-0'>

                            <ListItem className='mobile-menu py-2 px-3' >
                                <Link to="/home" onClick={handleLinkClick}>Home</Link>
                            </ListItem>

                            <ListItem className='mobile-menu py-2 px-3'>
                                <button onClick={handleDashboardLink}>Dashboard</button>
                            </ListItem>

                            <ListItem className='mobile-menu py-2 px-3'>
                                <Link to="/service" onClick={handleLinkClick}>Service</Link>
                            </ListItem>

                            <ListItem className='mobile-menu py-2 px-3'>
                                <Link to="/contactus" onClick={handleLinkClick}> Contact us</Link>
                            </ListItem>

                            {
                                (userData.name && userData.dashboardPath )
                                    ?
                                    <ListItem className='mobile-menu py-2 px-3' >
                                        <button onClick={logoutUser}>Log Out</button>
                                    </ListItem>
                                    :
                                    <ListItem className='mobile-menu py-2 px-3' >
                                        <Link to="/" onClick={handleLinkClick}> User Type</Link>
                                    </ListItem>
                            }

                        </List>

                    </Card>

                </OffcanvasBody>

            </COffcanvas>

        </div>

    );
}

export default Navbar;
