describe("smoke tests", () => {
  it("should allow you to visit the home page", () => {
    cy.visit("/");
  });
});
