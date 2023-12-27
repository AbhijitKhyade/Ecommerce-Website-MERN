import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

// Creating a context for managing authentication state
const AuthContext = createContext();

// Creating a provider component to wrap the application and manage authentication state
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // Setting the default authorization header for Axios requests
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        // Retrieve authentication data from local storage
        const data = localStorage.getItem("auth");
        // If authentication data exists, parse and set it in the state
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Providing the authentication state to the components using the AuthContext.Provider
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access to the authentication context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };