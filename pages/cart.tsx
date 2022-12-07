import React, { useContext } from "react";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { CartContext } from "../context/CartContext";
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
  Select,
  MenuItem,
} from "@material-ui/core";
import { ICartProduct } from "../types/cartProduct.d";

export default function CartPage() {
  const { cartProducts, removeFromCart, updateQuantity } =
    useContext(CartContext);

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
                          <Select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item,
                                parseInt(e.target.value as string)
                              )
                            }
                          >
                            {[...new Array(20)].map((_, i) => (
                              <MenuItem key={i + 1} value={i + 1}>
                                {i + 1}
                              </MenuItem>
                            ))}
                          </Select>
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
                        0
                      )}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <NextLink href="/checkout" passHref>
                      <Button variant="contained" color="primary" fullWidth>
                        Check Out
                      </Button>
                    </NextLink>
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
