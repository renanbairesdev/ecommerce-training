import React, { useContext } from "react";
import Layout from "../components/Layout";
import { CartContext } from "../context/CartContext";
import NextLink from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
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
import { ICartProduct } from "../types/cartProduct.d";

function CartPage() {
  const { cartProducts, removeFromCart } = useContext(CartContext);

  return (
    <Layout>
      <div>
        <h1>Cart</h1>
        {cartProducts.length === 0 ? (
          <div>
            Cart is empty. <NextLink href="/">Go shopping</NextLink>
          </div>
        ) : (
          <Grid container spacing={4}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartProducts.map((item: ICartProduct) => (
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
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeFromCart(item)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography>
                      Subtotal (
                      {cartProducts.reduce((a, c) => a + c.quantity, 0)} items)
                      : $
                      {cartProducts.reduce(
                        (a, c) => a + c.quantity * parseFloat(c.price),
                        0.0
                      )}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button variant="contained" color="primary" fullWidth>
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
