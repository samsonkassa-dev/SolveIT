/// <reference types="Cypress" />

describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('sign in as admin', () => {

        cy.signInAsAdmin();

    });
    it.only('sign in as participant', () => {


        cy.signInAsParticipant("zmukera@gmail.com", "zmukerazmukera");

    });


    // it.only('forgot password', () => {
    //     cy.get(':nth-child(8) > a').click();
    //     cy.get('.forget-password > a').click();
    //     cy.get('.input').type("rahelayeled@gmail.com");
    //     cy.get('.main-btn').click();
    // });
});