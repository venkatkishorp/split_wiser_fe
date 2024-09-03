'use client'
import ThemeRegistry from '@/utils/ThemeRegistry'
import { AuthContextProvider } from '@/context/AuthContext'
import {useRouter} from 'next/navigation';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function RootLayout({ children }) {

	return (
		<AuthContextProvider>
            <ThemeRegistry options={{ key: 'mui-theme' }}>
                <main>
                    {children}
                </main>
            </ThemeRegistry>
        </AuthContextProvider>
	)
}