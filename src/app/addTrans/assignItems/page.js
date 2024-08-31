'use client'
import { useEffect, useState } from "react";
import useStore from '@/app/store';
import { useRouter } from "next/navigation";
import { db, auth, storage } from '/src/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import fetchInfo from "@/app/api/gemini/fetchInfo";


function Page() {
  const router = useRouter();
  const { uploadedImage } = useStore();
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    setLoading(true);
    const getItemDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        const res = await fetchInfo(uploadedImage);
        setItemDetails(res);
        setLoading(false);
      }
      else {
        console.error('User not authenticated.');
      }
    }
    getItemDetails();
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

        const transactionsCollection = collection(db, 'transactions');
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



  return (loading ? <></> : <h1>{itemDetails}Only logged in users can view this page</h1>);
}

export default Page;