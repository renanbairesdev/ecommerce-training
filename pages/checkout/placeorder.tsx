import React, { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import NextLink from "next/link";
import Image from "next/image";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import { useRouter } from "next/router";
import CheckoutWizard from "../../components/CheckoutWizard";
import { CheckoutContext } from "../../context/CheckoutContext";
import { CartContext } from "../../context/CartContext";

function PlaceOrder() {
  const router = useRouter();
  const { shippingAddress, paymentMethod } = useContext(CheckoutContext);
  const { cartProducts } = useContext(CartContext);

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const totalPrice = round2(
    cartProducts.reduce((a, c) => a + parseFloat(c.price) * c.quantity, 0)
  );

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/checkout/payment");
    }
  }, [paymentMethod, router]);

  return (
    <Layout>
      <div>
        <CheckoutWizard activeStep={3}></CheckoutWizard>
        <h1>Place Order</h1>

        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <h2>Shipping Address</h2>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </ListItem>
              </List>
            </Card>
            <Card>
              <List>
                <ListItem>
                  <h2>Payment Method</h2>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
              </List>
            </Card>
            <Card>
              <List>
                <ListItem>
                  <h2>Order Items</h2>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartProducts.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>${item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <h2>Order Summary</h2>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary" fullWidth>
                    Place Order
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
