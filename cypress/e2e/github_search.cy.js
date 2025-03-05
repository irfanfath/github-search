describe("GitHub User Search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should load the page with search input and button", () => {
    cy.get("input[placeholder='Search GitHub users']").should("exist");
    cy.get("button").contains("Search").should("exist");
  });

  it("should search for GitHub users and display results", () => {
    cy.intercept("GET", "https://api.github.com/search/users*", {
      fixture: "users.json", 
    }).as("getUsers");

    cy.get("input[placeholder='Search GitHub users']").type("exampleuser");
    cy.get("button").contains("Search").click();

    cy.wait("@getUsers");

  });
});
