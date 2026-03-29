import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Initialize user state from localStorage for persistence
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('ecowaste_user');
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    });
    const [token, setToken] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ecowaste_token');
        }
        return null;
    });

    // Sync user state with localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('ecowaste_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ecowaste_user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('ecowaste_token', token);
        } else {
            localStorage.removeItem('ecowaste_token');
        }
    }, [token]);

    const login = ({ user: userPayload, token: tokenPayload }) => {
        setUser(userPayload);
        setToken(tokenPayload);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}