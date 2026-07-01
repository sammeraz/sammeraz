"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Magazine } from "@/lib/types";

const noopSubscribe = () => () => {};

/** True only once the client has hydrated; false (matching SSR) before that. */
function useIsHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export interface CartItem {
  slug: string;
  title: string;
  issue: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (magazine: Magazine) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aim-imports-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const isHydrated = useIsHydrated();

  // Cart is persisted, client-only state. Seed it from localStorage exactly
  // once, right after hydration completes — adjusting state during render
  // (React's documented pattern for this) rather than useEffect + setState,
  // so there's no extra render pass. Both the server and the client's first
  // render show an empty cart, so there's nothing to reconcile: no mismatch,
  // just a normal state update once real data is available.
  if (isHydrated && !loadedFromStorage) {
    setLoadedFromStorage(true);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage — start from an empty cart.
    }
  }

  useEffect(() => {
    if (!loadedFromStorage) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loadedFromStorage]);

  function addItem(magazine: Magazine) {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === magazine.slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === magazine.slug ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          slug: magazine.slug,
          title: magazine.title,
          issue: magazine.issue,
          price: magazine.price,
          image: magazine.images?.[0],
          quantity: 1,
        },
      ];
    });
    setIsOpen(true);
  }

  function removeItem(slug: string) {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  }

  function setQuantity(slug: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }
    setItems((prev) => prev.map((item) => (item.slug === slug ? { ...item, quantity } : item)));
  }

  function clear() {
    setItems([]);
  }

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    isOpen,
    addItem,
    removeItem,
    setQuantity,
    clear,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
