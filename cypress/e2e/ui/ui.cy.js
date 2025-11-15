//generate a sample test
describe('Test UI', () => {
 beforeEach(() => {
        // Visit the app's home using configured baseUrl
        cy.visit('/');
    });
  it('should navigate to the home page', () => {
    cy.contains('Home').should('be.visible');
  });
});