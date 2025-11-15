describe('Test API', () => {
  it('should return a list of users', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl').replace(/\/$/, '')}/products`,
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });
});
