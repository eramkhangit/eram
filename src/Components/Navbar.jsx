import React, { useState, useContext, useEffect } from 'react';
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from './Image/logo2.png'
import { AppBar, Container, Toolbar, Card, Box, Drawer, List, ListItem, Badge, Button } from '@mui/material'
import Context from '../Context/createContext';

import { useNavigate } from 'react-router-dom';

function Navbar() {

    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const { setUserData, userData, loginData, type,setType,setDashboardPath } = useContext(Context)

    const c = userData.company ? userData.company : loginData.company
    const n = userData.name ? userData.name : loginData.name
    const id = userData.id ? userData.id : loginData.id

    // ___________ Check it _________
    useEffect(() => {
        if (n)
            setShow(true)
        else
            setShow(false)
    }, [c, n])

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

    // __________________ Logout User______________
    const logoutUser = () => {
        window.localStorage.removeItem("User Name")
        window.localStorage.removeItem("User Type")
        window.localStorage.removeItem("Dashboard Path")

        setUserData(() => ({ name: '', type: '', dashboardPath: '' }))
        setShow(false)
        setType('')
        setDashboardPath('')
        navigate('/')
    }

    // _________ material ui drawer ________
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (

        <div className='bg-slate-50'>

            {/* _________ User Info _____________ */}
            <div className='flex pt-4 user-text justify-center gap-4  items-center text-lg'>

                {
                    (show && id)// check it
                    &&
                    <span className='user-text'> {n}</span>
                }

                {
                    (!show && id)
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

            {/* ______________ Responsive Menu __________ */}
            {/* <COffcanvas show={visible} onHide={() => setVisible(false)} placement="start" className="max-w-[65%] border-red-600">

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
                                (userData.name && userData.dashboardPath)
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

            </COffcanvas> */}

        </div>

    );
}

export default Navbar;
