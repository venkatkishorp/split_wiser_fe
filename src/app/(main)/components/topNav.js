import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button
  } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function TopNavbar(props) {
    const router = useRouter();
    const { pathname } = router;
    console.log('Pathname in ', pathname);

    function handleNewGroup() {
        router.push('/allGroups/createGroup');
    }

    const handleLogout = () => {
        Cookies.remove('userCookie');
        router.push("/signin");
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#00a3b8d1' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="secondary">
                    Splitwiser
                </Typography>
                { props.icon }
                <Button onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}