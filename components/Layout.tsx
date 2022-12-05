import React from "react";
import Head from "next/head";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import Link from "next/link";
import Header from "./Header";

interface LayoutInterface {
  children: React.ReactElement;
}

export default function Layout(props: LayoutInterface) {
  return (
    <div>
      <Head>
        <title>Ecommerce traning</title>
      </Head>
      <Header />
      <Container>{props.children}</Container>
    </div>
  );
}
