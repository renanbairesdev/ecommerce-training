import React from "react";
import Head from "next/head";
import { Container } from "@material-ui/core";
import Header from "./Header";

interface LayoutInterface {
  children: React.ReactElement;
}

export default function Layout(props: LayoutInterface) {
  return (
    <div>
      <Head>
        <title>E-commerce training</title>
      </Head>
      <Header />
      <Container>{props.children}</Container>
    </div>
  );
}
