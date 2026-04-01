import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('cozyUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);

        //adding to LocalStorage
        localStorage.setItem('cozyUser', JSON.stringify(userData));
        localStorage.setItem('token', userData.token); 
        localStorage.setItem('userId', userData.userId);
    };

    const logout = () => {
        setUser(null);

        // delete from LocalStorage
        localStorage.removeItem('cozyUser');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = "/login";
    };

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token' && !e.newValue) {
                setUser(null);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);