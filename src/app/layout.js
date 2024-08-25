'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import { Margin } from '@mui/icons-material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full bg-white">
            {/*
        <head /> will contain the components returned by the nearest parent
            head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        <head /> */}
            {/* <head> */}
            {/* <script src="https://cdn.tailwindcss.com"></script> */}
            {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
            {/* </head> */}
            <body className="h-full w-full" style={{ margin: 0 }}>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    )
}