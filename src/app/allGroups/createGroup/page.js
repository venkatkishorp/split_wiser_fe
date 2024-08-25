'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { collection, addDoc, } from 'firebase/firestore';
import { db, auth } from '/src/firebase/config';
import {
	Box,
	Container,
	AppBar,
	Toolbar,
	Typography,
	Button,
	TextField,
} from '@mui/material';


export default function Page() {
	const [newGroup, setNewGroup] = useState("");
	const router = useRouter();

	const handleCreateGroup = async () => {
		try {
			const user = auth.currentUser;
			if (user) {
				const userGroupsCollection = collection(db, 'userGroups');
				const docRef = await addDoc(userGroupsCollection, {
					name: newGroup,
					owner: user.uid,
					users: [user.uid]
				});

				router.push(`/groupTrans?groupId=${docRef.id}`);
				console.log('Group created');
			} else {
				console.error('User not authenticated.');
			}
		} catch (error) {
			console.error('Error creating group:', error);
		}
	}


	return (
		<>
			<AppBar position="static" sx={{ backgroundColor: '#00a3b8d1', color: 'white' }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Create a group
					</Typography>
					<Button aria-label="Save" onClick={handleCreateGroup} sx={{ color: 'white' }}>
						Done
					</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ marginY: 2 }}>
				<Box component="form" noValidate autoComplete="off">
					<TextField fullWidth id="standard-basic" label="Group name" variant="standard" onChange={(e) => setNewGroup(e.target.value)} />
				</Box>
			</Container>
		</>
	);

}