

describe('User Can Login to System', () => {

    // Positif Test Case
    it('User can login with valid username dan password', () => {
        // arrange
        cy.visit("http://localhost:8000/");
        // act
        cy.get('input[name="email"]').type('superadmin@gmail.com');
        cy.get('input[name="password"]').type('password');
        // Submit the form
        cy.get(".btn").click();
             
        // assertion
        cy.get(".nav-link > .d-sm-none").should('have.text','Hi, SuperAdmin');
    });

    // negative  test case 1 : User cannot login if email false
    it('User cannot login without entering email', () => {
        // arrange
        cy.visit("http://localhost:8000/login");
        // action
        cy.get('input[name="email"]').type('superadminsalah@gmail.com')
        cy.get('input[name="password"]').type('password');
        cy.get(".btn").click();
        // assertions
        cy.get('.invalid-feedback').should("have.text", "These credentials do not match our records.");
       
    });
    
    // negative  test case 2 : User cannot login if password false
    it('User cannot login without entering password', () => {
        // arrange
        cy.visit("http://localhost:8000/login")
        
        cy.get('input[name="email"]').type('superadmin@gmail.com');
        cy.get('input[name="password"]').type('passwordsalah');
        cy.get(".btn").click();

        // assertion
        cy.get('.invalid-feedback').should('have.text','These credentials do not match our records.');
        
    });

    // negative test case 3 : user cannot login email is empty & password valid
    it.only('User cannot login without Email is empty & password valid', () => {
        // arrange
        cy.visit("http://localhost:8000/login");
        // action
        cy.get('input[name="email"]').clear().should('have.value', '');
        cy.get('input[name="password"]').type('password');

        cy.get(".btn").click();
        // assertion
        cy.url().should('include', 'http://localhost:8000/login');
    });

});