// Cart context
"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const initialRender = useRef(true);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("cartItems"))) {
            const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
            setCartItems([...cartItems, ...storedCartItems]);
        }
    }, []);
    
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems([item]);
    };

    const removeFromCart = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
