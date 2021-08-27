import { Product } from "@/product/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  // add cart item id => two of the same shirts but with diferent sizes
  quantity: number;
  optionSelected: string;
  product: Product;
}
type globalContext = {
  cart: CartItem[];
  cartModal: boolean;
  toogleModal: (bool: boolean) => void;
  addToCart: (product: Product) => void;
  removeByOneFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  setOption: (index: number, value: string) => void;
  total: number;
};
const globalContextDefaultValues: globalContext = {
  cart: [],
  cartModal: false,
  toogleModal: (bool: boolean) => {},
  addToCart: (product: Product) => {},
  removeByOneFromCart: (product: Product) => {},
  setOption: (index: number, value: string) => {},
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
  const [cartModal, setCartModal] = useState(false);
  const [hasInit, setHasInit] = useState(false);
  useEffect(() => {
    const cartLocalStorage = window.localStorage.getItem("cart");
    if (cartLocalStorage) {
      // potential error if cart on localstorage iis out of sync with structured,
      // needs to implement some error checking or throw condition to set back to empty
      setCart(JSON.parse(cartLocalStorage));
    }
    setHasInit(true);
  }, []);
  useEffect(() => {
    if (!hasInit) {
      return;
    }
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product: Product) => {
    const productFromCart = cart.find((row) => row.product.id === product.id);
    if (productFromCart) {
      const indexProductFromCart = cart.findIndex(
        (row) => row.product.id === product.id
      );
      cart[indexProductFromCart].quantity++;
      setCart([...cart]);
      return;
    }
    setCart([
      ...cart,
      { product, quantity: 1, optionSelected: product.options[0].values[0] },
    ]);
  };

  const removeFromCart = (product: Product) => {
    setCart([...cart.filter((row) => row.product.id !== product.id)]);
  };
  const removeByOneFromCart = (product: Product) => {
    const indexProductFromCart = cart.findIndex(
      (row) => row.product.id === product.id
    );
    if (cart[indexProductFromCart].quantity > 1) {
      cart[indexProductFromCart].quantity--;
      setCart([...cart]);
    } else {
      removeFromCart(product);
    }
  };
  const toogleModal = (bool: boolean) => {
    setCartModal(bool);
  };
  const total = React.useMemo(
    () =>
      cart.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0
      ),
    [cart]
  );
  const setOption = (index: number, value: string) => {
    console.log(value);
    cart[index].optionSelected = value;
    setCart([...cart]);
  };
  const value = {
    cart,
    removeByOneFromCart,
    cartModal,
    toogleModal,
    addToCart,
    removeFromCart,
    total,
    setOption,
  };
  return (
    <>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </>
  );
}
