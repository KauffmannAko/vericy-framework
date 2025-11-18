export class BasePage {
    constructor(){
        this.loginUsernameField = 'input[name="username"]';
        this.loginPasswordField = 'input[name="password"]';
        this.loginLoginButton = 'input[type="submit"]';
        this.overviewAccountTable = 'table#accountTable';
    }

    loginAsCustomer(username, password){
        cy.get(this.loginUsernameField).should('be.visible').type(username);
        cy.get(this.loginPasswordField).should('be.visible').type(password);
        cy.get(this.loginLoginButton).should('be.visible').click();
    }
    accountOverviewTable(){
        return cy.get(this.overviewAccountTable).find('tr');
    }

}