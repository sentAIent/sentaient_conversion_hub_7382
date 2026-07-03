import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string; // productTag id or product id
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string | null;
  };
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (productData: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (productData: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === productData.product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === productData.product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { id: productData.id, product: productData.product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prevItems) => 
      prevItems.map(item => 
        item.product.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
