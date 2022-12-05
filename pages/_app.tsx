import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <CartProvider>
      {" "}
      <Component {...pageProps} />
    </CartProvider>
  );
}
