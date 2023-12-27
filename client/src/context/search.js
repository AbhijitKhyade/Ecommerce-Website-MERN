import { useState, useContext, createContext } from 'react';

// Creating a context for managing search-related state
const SearchContext = createContext();

// Creating a provider component to wrap the application and manage search-related state
const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        result: []
    });
    // Providing the search-related state to the components using the SearchContext.Provider
    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook for easy access to the search-related context
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };