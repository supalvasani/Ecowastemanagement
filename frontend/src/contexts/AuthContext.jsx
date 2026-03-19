import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Initialize user state from localStorage for persistence
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ecowaste_user');
        }
        return null;
    });

    // Sync user state with localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('ecowaste_user', user);
        } else {
            localStorage.removeItem('ecowaste_user');
        }
    }, [user]);

    const login = (username) => setUser(username);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}