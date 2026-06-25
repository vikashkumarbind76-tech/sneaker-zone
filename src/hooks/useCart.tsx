import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, size: string | undefined, quantity: number) => void;
  updateSize: (id: number, oldSize: string | undefined, newSize: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_IMAGE_MAPPING_VERSION = 'product-image-map-v3';

const sameLine = (a: CartItem, id: number, size?: string) =>
  a.id === id && (a.size ?? '') === (size ?? '');

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (localStorage.getItem('cartImageMappingVersion') !== CART_IMAGE_MAPPING_VERSION) {
      localStorage.setItem('cartImageMappingVersion', CART_IMAGE_MAPPING_VERSION);
      localStorage.removeItem('cart');
      return [];
    }
    const saved = localStorage.getItem('cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('[cart] Cleared unreadable cart cache', error);
      localStorage.removeItem('cart');
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => sameLine(i, item.id, item.size));
      if (existing) {
        return prev.map(i =>
          sameLine(i, item.id, item.size) ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size?: string) => {
    setItems(prev => prev.filter(i => !sameLine(i, id, size)));
  };

  const updateQuantity = (id: number, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setItems(prev => prev.map(i =>
      sameLine(i, id, size) ? { ...i, quantity } : i
    ));
  };

  const updateSize = (id: number, oldSize: string | undefined, newSize: string) => {
    setItems(prev => {
      const current = prev.find(i => sameLine(i, id, oldSize));
      if (!current) return prev;
      const duplicate = prev.find(i => sameLine(i, id, newSize) && i !== current);
      if (duplicate) {
        return prev
          .filter(i => !sameLine(i, id, oldSize))
          .map(i =>
            sameLine(i, id, newSize)
              ? { ...i, quantity: i.quantity + current.quantity }
              : i
          );
      }
      return prev.map(i =>
        sameLine(i, id, oldSize) ? { ...i, size: newSize } : i
      );
    });
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateSize,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
