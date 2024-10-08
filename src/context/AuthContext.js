import React from 'react';
import {
	onAuthStateChanged,
	getAuth,
} from 'firebase/auth';
import { auth } from '@/firebase/config';


export const AuthContext = React.createContext({});
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider = ({
    children,
}) => {
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{children}
		</AuthContext.Provider>
	);
};