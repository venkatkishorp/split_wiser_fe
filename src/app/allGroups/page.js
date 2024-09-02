'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  IconButton,
  Button
} from '@mui/material';
import { db, auth } from '/src/firebase/config';
import { faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';

function Page() {
  const [groups, setGroups] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userGroupsQuery = query(
            collection(db, 'userGroups'),
            where('users', 'array-contains', user.uid) // Query for groups where the user is in the 'users' array
          );

          const querySnapshot = await getDocs(userGroupsQuery);
          const groupData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));


          setGroups(groupData);
        } else {
          console.error('User not authenticated.');
          // Handle the case where the user is not logged in
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
        // Handle errors appropriately 
      }
    };
    fetchGroups();
  }, [])

  function handleGroupTrans() {
    router.push('/groupTrans');
  }

  function handleNewGroup() {
    router.push('/allGroups/createGroup');
  }

  const handleLogout = () => {
    Cookies.remove('userCookie');
    router.push("/signin");
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#00a3b8d1' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="secondary">
            Splitwiser
          </Typography>
          <IconButton variant="text" color="secondary" size="small" aria-label="delete" onClick={handleNewGroup}>
            <FontAwesomeIcon icon={faUsersLine} />
          </IconButton>
          <Button onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar >

      <Container>
        <Typography component="div" sx={{ flexGrow: 1, marginY: 2 }} fontWeight={"bold"} color={"#009688"} fontSize={"smaller"}>
          Overall, you are owed $467.47
        </Typography>

        <Grid container spacing={2} sx={{ paddingY: 2 }}>
          {/* Map over your group/expense data to render cards */}
          {groups.map((item) => (
            <Grid item sx={12} sm={6} md={4} marginBottom={2} key={item.id} width={"100%"}>
              <CardActionArea onClick={handleGroupTrans}>
                <Card sx={{ display: 'flex', width: '100%', }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, padding: 2 }}
                    image={item.imageUrl ? item.imageUrl : "/static/images/defaultGroupImg.png"}
                    alt="Group Icon"
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="body1">
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" component="div">
                        You are owed/ you owe some amount
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Page;