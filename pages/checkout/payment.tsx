import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import CheckoutWizard from "../../components/CheckoutWizard";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { CheckoutContext } from "../../context/CheckoutContext";
import Swal from "sweetalert2";
import { TPaymentMethod } from "../../types/checkout.d";

export default function Payment() {
  const router = useRouter();
  const { shippingAddress, setPaymentMethod } = useContext(CheckoutContext);
  const [method, setMethod] = useState<TPaymentMethod>(null);

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/checkout/shipping");
    }
  }, [router, shippingAddress]);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!method) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Payment method is required",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setPaymentMethod(method);
      router.push("/checkout/placeorder");
    }
  };
  return (
    <Layout>
      <div>
        <CheckoutWizard activeStep={2}></CheckoutWizard>
        <form onSubmit={submitHandler}>
          <h1>Payment</h1>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethod"
                  value={method}
                  onChange={(e) => setMethod(e.target.value as TPaymentMethod)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value="PayPal"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Stripe"
                    value="Stripe"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={() => router.push("/checkout/shipping")}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </form>
      </div>
    </Layout>
  );
}
