export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type TPaymentMethod = "PayPal" | "Stripe" | "Cash" | "Test Fail" | null;
