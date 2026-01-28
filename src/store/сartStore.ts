import { create } from 'zustand';
import { Product, CartItem } from '../types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateNumber: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (product) => {
    const existingItem = get().items.find(item => item.id === product.id);
    
    if (existingItem) {
      set(state => ({
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }));
    } else {
      set(state => ({
        items: [...state.items, { ...product, quantity: 1 }]
      }));
    }
  },
  
  removeItem: (productId) => {
    set(state => ({
      items: state.items.filter(item => item.id !== productId)
    }));
  },
  
  updateNumber: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set(state => ({
      items: state.items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}));