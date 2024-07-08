describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

// Entering text into a todo box and clicking in add todo button should make the text entered
// to appear in teh list of todos
  it("should add a new todo", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Learn Cypress");
    cy.contains("Add Todo").click();
    cy.contains("Learn Cypress").should("exist");
  });

// Click on the checkbox next to a todo and it should have a strike through css property
  it("should mark a todo as complete", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Learn Cypress");
    cy.contains("Add Todo").click();
    cy.contains("Learn Cypress")
      .parent()
      .find('input[type="checkbox"]')
      .check();
    cy.contains("Learn Cypress")
      .should("have.css", "text-decoration")
      .and("include", "line-through");
  });

    // Click on a delete button next to a todo and the todo shuld not exist
  it("should delete a todo", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Learn Cypress");
    cy.contains("Add Todo").click();
    cy.contains("Learn Cypress").parent().contains("Delete").click();
    cy.contains("Learn Cypress").should("not.exist");
  });

// Try adding an empty todo and it should not be added to thelist
  it("should not add empty todo", () => {
    cy.get('input[placeholder="Add a new todo"]').type("{enter}");
    cy.get("ul").should("not.contain", "li");
  });

// Add a todo, click on the checkbox next it to make sure that it is marked as complete
// with a css strike through and in the same test, uncheck it to make sure the strike
//through dissappears
  it("should toggle todo completion", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Learn Cypress");
    cy.contains("Add Todo").click();
    cy.contains("Learn Cypress")
      .parent()
      .find('input[type="checkbox"]')
      .check();
    cy.contains("Learn Cypress")
      .should("have.css", "text-decoration")
      .and("include", "line-through");
    cy.contains("Learn Cypress")
      .parent()
      .find('input[type="checkbox"]')
      .uncheck();
    cy.contains("Learn Cypress")
      .should("have.css", "text-decoration")
      .and("not.include", "line-through");
  });

  it("should clear input after adding todo", () => {
    cy.get('input[placeholder="Add a new todo"]').type("Learn Cypress");
    cy.contains("Add Todo").click();
    cy.get('input[placeholder="Add a new todo"]').should("have.value", "");
  });
});
