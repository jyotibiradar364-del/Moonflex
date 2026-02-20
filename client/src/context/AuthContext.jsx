import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load from localStorage on mount
        const savedTokens = localStorage.getItem('tokens');
        const savedUser = localStorage.getItem('user');
        if (savedTokens && savedUser) {
            setTokens(JSON.parse(savedTokens));
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (uname, password) => {
        const { data } = await API.post('/auth/login/', { uname, password });
        const tokenData = { access: data.access, refresh: data.refresh };

        // Decode JWT to get user info
        const payload = JSON.parse(atob(data.access.split('.')[1]));
        const userData = {
            uid: payload.uid,
            uname: payload.uname,
            email: payload.email,
        };

        localStorage.setItem('tokens', JSON.stringify(tokenData));
        localStorage.setItem('user', JSON.stringify(userData));
        setTokens(tokenData);
        setUser(userData);

        return userData;
    };

    const register = async (uname, email, phone, password) => {
        await API.post('/auth/register/', { uname, email, phone, password });
    };

    const logout = () => {
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
        setTokens(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                tokens,
                loading,
                isAuthenticated: !!tokens,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
