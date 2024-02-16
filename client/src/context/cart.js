import { useState, useContext, createContext, useEffect } from 'react';

// Creating a context for managing the shopping cart state
const CartContext = createContext();

// Creating a provider component to wrap the application and manage the shopping cart state
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Retrieve existing cart items from local storage
        let existingCartItem = localStorage.getItem('cart');
        // If existing cart items exist, parse and set them in the state
        if (existingCartItem) setCart(JSON.parse(existingCartItem));
    }, []);
    // Providing the shopping cart state to the components using the CartContext.Provider
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for easy access to the shopping cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };