import React, { createContext, useContext, useState } from 'react';
export const UserContext = createContext();

export const useUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem('userData');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
