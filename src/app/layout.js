'use client'
import ThemeRegistry from '@/utils/ThemeRegistry'
import { AuthContextProvider } from '@/context/AuthContext'
import { Margin } from '@mui/icons-material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// export const metadata = {
// 	title: 'Splitwiser',
// 	description: 'Make your splits easier',
// }

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="h-full bg-white">
			<body className="h-full w-full" style={{ margin: 0 }}>
				<AuthContextProvider>
					<ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
				</AuthContextProvider>
			</body>
		</html>
	)
}