import { Product } from "@/product/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  quantity: number;
  product: Product;
}
type globalContext = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  total: number;
};
const globalContextDefaultValues: globalContext = {
  cart: [],
  addToCart: (product: Product) => {},
  removeFromCart: (product: Product) => {},
  total: 0,
};
const GlobalContext = createContext<globalContext>(globalContextDefaultValues);

export function useCart() {
  return useContext(GlobalContext);
}
type Props = {
  children: ReactNode;
};

export function GlobalProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, { product, quantity: 1 }]);
  };

  const removeFromCart = (product: Product) => {
    setCart(cart.filter((row) => row.product.id !== product.id));
  };
  const total = React.useMemo(
    () => cart.reduce((total, { product }) => total + product.price, 0),
    [cart]
  );
  const value = {
    cart,
    addToCart,
    removeFromCart,
    total,
  };
  return (
    <>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </>
  );
}
