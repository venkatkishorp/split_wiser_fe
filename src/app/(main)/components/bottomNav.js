// components/BottomNavbar.js
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {useRouter} from 'next/navigation';

export function BottomNavbar() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  /**
   * This method routes to /allGroups page
   */
  const routeToGroups = () => {
    router.push('/allGroups');
  }

  const routeToFriends = () => {
    router.push('/friends');
  }

  const routeToActivity = () => {
    router.push('/activity');
  }

  const routeToProfile = () => {
    router.push('/profile');
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Groups" onClick={routeToGroups}/>
        <BottomNavigationAction label="Friends" onClick={routeToFriends}/>
        <BottomNavigationAction label="Activity" onClick={routeToActivity}/>
        <BottomNavigationAction label="Profile" onClick={routeToProfile}/>
      </BottomNavigation>
    </Paper>
  );
}
