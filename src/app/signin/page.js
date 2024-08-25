'use client'
import React from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "../api/firebase/auth/signin";
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Page() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [signinError, setSigninError] = React.useState(false);
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const result = await signIn({
            method: 'POST',
            body: {
                'email': email,
                'password': password
            }
        });

        if (result?.operationType == "signIn") {
            router.push("/allGroups");
        }
        else {
            router.push("/signin");
            setSigninError(true);
            setPassword('');
            setTimeout(() => {
                setSigninError(false);
            }, 3000);
        }
    }

    return (
        <>
            {signinError && <Alert severity="error">Check your email or password!</Alert>}

            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h2">
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
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleForm} sx={{ mt: 1 }}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        Do not have an account yet?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Page;