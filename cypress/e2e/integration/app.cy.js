/// <reference types="cypress" />

describe("Add item to cart", () => {
  it("should add see items on the shopping cart after clicking add to cart button", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get("h1").contains("Products");

    cy.get("span:contains('Add to cart')").first().click();

    cy.get("a[href='/cart']").first().click();

    cy.get("h1").contains("Cart");

    cy.contains("Subtotal").should("be.visible");
  });
});
