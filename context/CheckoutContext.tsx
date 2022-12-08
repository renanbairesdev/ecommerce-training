import React, { createContext } from "react";
import { TPaymentMethod, IShippingAddress } from "../types/checkout.d";

const initialValue: IShippingAddress = {
  address: "",
  city: "",
  country: "",
  fullName: "",
  postalCode: "",
};

type CheckoutContextType = {
  shippingAddress: IShippingAddress;
  setShippingAddress: React.Dispatch<React.SetStateAction<IShippingAddress>>;
  paymentMethod: TPaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<TPaymentMethod>>;
};

export const CheckoutContext = createContext({} as CheckoutContextType);

export function CheckoutProvider(props: { children: React.ReactNode }) {
  const [shippingAddress, setShippingAddress] = React.useState(initialValue);
  const [paymentMethod, setPaymentMethod] =
    React.useState<TPaymentMethod>(null);

  const value = {
    shippingAddress,
    setShippingAddress,
    paymentMethod,
    setPaymentMethod,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {props.children}
    </CheckoutContext.Provider>
  );
}
