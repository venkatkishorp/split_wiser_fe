'use client'
import { useEffect, useState } from "react";
import useStore from '@/app/store';
import { useRouter } from "next/navigation";
import { db, auth, storage } from '/src/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import fetchInfo from "@/app/api/gemini/fetchInfo";
import {
	Box,
	Button,
  Grid,
	Container,
	Typography,
  Paper,
	IconButton,

} from "@mui/material";


function Page() {
  const router = useRouter();
  const { uploadedImage } = useStore();
  const { items } = useStore();
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [transDate, setTransDate] = useState('');

  const scrollContainerStyle = {
    height: '80vh', // Adjust height as necessary
    overflowY: 'auto',
    padding: '1rem',
  };

  useEffect(() => {
    console.log('The items from the store are: ', items);
  }, []);

  const handleSaveTransaction = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        let imageUrl = null; // Will store the image URL from Firebase Storage

        const res = await fetchInfo(uploadedImage);
        setItemDetails(res);

        if (uploadedImage) { // If an image was selected
          const storageRef = ref(storage, `receiptImages/`); // Unique path in Firebase Storage
          await uploadBytes(storageRef, uploadedImage);
          imageUrl = await getDownloadURL(storageRef);
        }

        const transactionsCollection = collection(db, 'Transactions');
        await addDoc(transactionsCollection, {
          receiptUrl: imageUrl
          // TODO: add other fields here
        });

        router.push('');
      } else {
        console.error('User not authenticated.');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  }

  return (
    <>
      <TopNavbar icon={ <></> } />
      <Container>
        <Grid container spacing={2} sx={{ height: '100vh', padding: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box component={Paper} sx={scrollContainerStyle}>
              <Typography variant="h6" gutterBottom>
                Items
              </Typography>
              {items.map((item) => (
                <Paper sx={{ padding: 2, marginBottom: 2, cursor: 'pointer' }}>
                  <Typography variant="body1">{item.name} {item.quantity == null && (item.quantity)}</Typography>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} sm={6}>
            <Box component={Paper} sx={scrollContainerStyle}>
              <Typography variant="h6" gutterBottom>
                Members
              </Typography>
              {[...Array(5)].map((_, index) => (
                <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
                  <Typography variant="body1">Right Item {index + 1}</Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box>
          <h3>Assign Items</h3>
          <h4>The items:</h4>
          <ul>
            {items.map((item) => (
              <li>{item.name}, {item.price}, {item.quantity}</li>
            ))}
          </ul>
        </Box>
      </Container>
    </>
  );
}

export default Page;