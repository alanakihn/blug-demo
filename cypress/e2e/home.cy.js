describe("The Home Page", () => {
  it("loads", () => {
    cy.visit("/");
  });
  it("contains a picture", () => {
    cy.visit("/");
    cy.get("img").should("exist");
  });
  it("contains a button to /hobbies", () => {
    cy.visit("/");
    cy.get("button").should("exist");
    cy.get("button").click();
    cy.url().should("include", "/hobbies");
  });
});
