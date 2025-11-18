
import { BasePage } from '../../pages/BasePage.js';
const basePage = new BasePage();


describe('ParaBank Login Functionality', () => {
  let baseLoginData;
  before(()=>{

    // Load the login data from the fixture
    cy.fixture('base').then((data)=>{
      baseLoginData = data;
    }) 
    
  })

 beforeEach(() => {
        // Navigate to the login page
        cy.visit('/');
    });

  it('As customer, I should be able to login', () => {

    //check if you on the login page
    cy.contains(baseLoginData.loginPageData.customerLogin).should('be.visible');
    basePage.loginAsCustomer(baseLoginData.username, baseLoginData.password);

    //check if you are successfully logged in
    cy.url().should('include',baseLoginData.paths.overview);
    cy.contains(baseLoginData.overviewPageData.accountServices).should('be.visible');
    cy.contains(baseLoginData.overviewPageData.accountsOverview).should('be.visible');
    basePage.accountOverviewTable().should('have.length.greaterThan', 1);

  });

});