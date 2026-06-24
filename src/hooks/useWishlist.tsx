import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  slug: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => boolean; // returns true if added, false if removed
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = 'wishlist-v1';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isInWishlist = (id: number) => items.some(i => i.id === id);

  const toggleWishlist = (item: WishlistItem) => {
    let added = false;
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      added = true;
      return [...prev, item];
    });
    return added || !items.some(i => i.id === item.id);
  };

  const removeFromWishlist = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{
      items,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      totalItems: items.length,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
