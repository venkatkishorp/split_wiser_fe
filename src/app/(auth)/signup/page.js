'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import { signUp } from "../../api/firebase/auth/signup";
import { userSetup } from "../../api/userSetup";
import Alert from '@mui/material/Alert';
import {
	Container,
	TextField,
	Button,
	Typography,
	Grid,
	Box,
	Avatar,
	CssBaseline,
	Link
} from '@mui/material';
import Cookies from 'js-cookie';

function Page() {
	const [email, setEmail] = React.useState('');
	const [signupError, setSignupError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const router = useRouter();

	const handleForm = async (event) => {
		event.preventDefault()

		const result = await signUp({
			method: 'POST',
			body: {
				'email': email,
				'password': password
			}
		});

		if (result?.operationType == "signIn") {
			const addUser = await userSetup({
				'userId': result?.user.uid,
				'name': name,
				'phone': phone,
				'email': email
			});

			if (addUser?.type === 'document') {
				Cookies.set('userCookie', result?.user.uid);
				router.push("/allGroups");
			}
			else {
				router.push("/signin");
				setSignupError(true);
				setPassword('');
				setErrorMessage('Error adding user. Please try to login.')
				setTimeout(() => {
					setSignupError(false);
				}, 3500);
			}
		}
		else {
			router.push("/signup");
			setSignupError(true);
			setPassword('');
			setErrorMessage('An account with this email already exists!')
			setTimeout(() => {
				setSignupError(false);
			}, 3500);
		}
	}

	return (
		<>
			{signupError && <Alert severity="error">{errorMessage}</Alert>}

			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography variant="h4" fontWeight="bold">
						Splitwiser
					</Typography>
				</Box>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
					<Typography variant="h6">
						Create Account
					</Typography>
					<Box component="form" onSubmit={handleForm} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="standard"
									required
									fullWidth
									id="name"
									label="Name"
									name="name"
									autoComplete="name"
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="standard"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="standard"
									required
									fullWidth
									id="phone"
									label="Phone Number"
									name="phone"
									autoComplete="tel"
									onChange={(e) => setPhone(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="standard"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/signin" variant="body2">
									Already have an account?
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default Page;