import Cookies from "js-cookie";
import React, { createContext } from "react";
import Swal from "sweetalert2";
import { ICartProduct } from "../types/cartProduct.d";
import { IProduct } from "../types/product.d";

type CartContextType = {
  cartProducts: ICartProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
};

const initialState: { cartProducts: ICartProduct[] } = {
  cartProducts: Cookies.get("cartProducts")
    ? JSON.parse(Cookies.get("cartProducts") || "[]")
    : [],
};
export const CartContext = createContext({} as CartContextType);

export function CartProvider(props: { children: React.ReactNode }) {
  const [cartProducts, setCartProducts] = React.useState([] as ICartProduct[]);

  const addToCart = (newProduct: IProduct) => {
    const existItem = cartProducts.find((item) => item.id === newProduct.id);
    if (existItem) {
      setCartProducts(
        cartProducts.map((item) =>
          item.id === existItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartProducts([...cartProducts, { ...newProduct, quantity: 1 }]);
    }
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: "Product added",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const removeFromCart = (product: IProduct) => {
    setCartProducts(cartProducts.filter((item) => item.id !== product.id));
  };

  const value = { cartProducts, addToCart, removeFromCart };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
}
