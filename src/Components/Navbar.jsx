import React, { useState, useContext } from 'react';
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from './Image/logo2.png'
import { AppBar, Container, Toolbar, Card, Box, Drawer, List, ListItem, Badge, Button } from '@mui/material'
import Context from '../Context/createContext';

import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate()
    // _________ material ui drawer ________
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const { setUserData, userData, setLoginData, loginData, type, setType, setDashboardPath } = useContext(Context)

    const c = userData.company ? userData.company : loginData.company
    const n = userData.name ? userData.name : loginData.name
    // const id = userData.id ? userData.id : loginData.id

    // ________________ Dashboard Check ____________
    const handleDashboardLink = () => {

        const t = type ? type : userData.type

        switch (t) {
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
    }

    // __________________ Logout______________
    const logoutUser = () => {
        window.localStorage.removeItem("User Name")
        window.localStorage.removeItem("User Type")
        window.localStorage.removeItem("Dashboard Path")

        setUserData({ name: '', type: '', dashboardPath: '' })
        setLoginData({ name: '', id: '', mobile: '', company: '' }) // change
        setType('')
        setDashboardPath('')
        navigate('/')
    }

    return (

        <div className='bg-slate-50'>

            {/* _________ User Info _____________ */}
            <div className='flex pt-4 user-text justify-center gap-4  items-center text-lg'>

                {
                    n
                    &&
                    <span className='user-text'> {n}</span>
                }

                {
                    c
                    &&
                    <span className='user-text'> {c}</span>
                }

                <Badge badgeContent={4} color="primary">
                    <NotificationsIcon sx={{ color: '#76885B' }} />
                </Badge>

            </div>

            <nav className=' flex items-center justify-between shadow-sm shadow-slate-200 px-4'>

                <Link to='/' className='w-[30%] h-[3.4rem] md:w-[10%] md:h-[20px]'>
                    <img src={Logo} className='w-[100%] h-[80%] pt-3 ' alt="Logo" />
                </Link>

                {/* __________ Menu Button ____________ */}
                <button
                    className="lg:hidden"
                    type="button"
                    onClick={toggleDrawer(true)}
                // onClick={() => setVisible(true)}
                >
                    <IoIosMenu className='text-5xl font-semibold text-[#76885B]' />
                </button>

                {/* _____________ Dekstop Menu ___________ */}
                {/* <AppBar sx={{ display: { xs: 'none', md: 'block' } }}>

                    <Container maxWidth="xl" >

                        <Toolbar disableGutters>

                            <Link to='/' className='w-[30%] text-center h-[3.4rem] md:w-[10%] md:h-[20px]'>
                                <p className='text-3xl font-blold'>C POINT</p>
                            </Link>

                            <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                                {heading.map((h, index) => (
                                    <Button
                                        key={index}
                                        // onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {h}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>

                    </Container>

                </AppBar> */}

            </nav>

            {/* ____________ Drawer __________ */}
            <Drawer open={open} onClose={toggleDrawer(false)}>

                <Box sx={{ height: '10vh', padding: '4px' }}>
                    <img src={Logo} className='w-[70%] h-[70%] pt-3 ' alt="Logo" />
                </Box>

                <hr className="w-full h-[1px] mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />

                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} >
                    <Card className=" w-full shadow-none ">

                        <List className='p-3'>

                            <ListItem className='mobile-menu py-2 px-3' >
                                <Link to="/home" >Home</Link>
                            </ListItem>

                            <ListItem className='mobile-menu py-2 px-3'>
                                <button onClick={handleDashboardLink}>Dashboard</button>
                            </ListItem>

                            <ListItem className='mobile-menu py-2 px-3'>
                                <Link to="/service" >Service</Link>
                            </ListItem>

                            <ListItem className='mobile-menu py-2 px-3'>
                                <Link to="/contactus"> Contact us</Link>
                            </ListItem>

                            {
                                ((userData.id))
                                    ?
                                    <ListItem className='mobile-menu py-2 px-3' >
                                        <button onClick={logoutUser}>Log Out</button>
                                    </ListItem>
                                    :
                                    <ListItem className='mobile-menu py-2 px-3' >
                                        <Link to="/" > User Type</Link>
                                    </ListItem>
                            }

                        </List>

                    </Card>
                </Box>

            </Drawer>

        </div>

    );
}

export default Navbar;
