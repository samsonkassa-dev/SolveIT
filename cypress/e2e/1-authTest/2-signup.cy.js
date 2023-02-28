/// <reference types="Cypress" />

describe('Register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('sign up as participant', () => {
        // DONT FORGET TO CHANGE BACKEND UID TO 1234 FOR TESTING

        cy.intercept("POST", "http://localhost:3000/api/UserAccounts/register-participants", (req) => {
            delete req.headers["if-none-match"];
        }).as("participantRegistration");

        // var targetDate = dayjs().subtract(20, 'years').format("MM/DD/YYYY");
        cy.get(':nth-child(8) > a').click();
        cy.get('[routerlink="/register/participant"]').click();
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .form-control').type("zmukera12");
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > .form-control').type("zmukera12");
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(3) > .form-control').type("zmukera12");
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(4) > .form-control').type("zmukera12@gmail.com");
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(5) > .form-control').type("zmukera12");
        cy.get('.input-group > .form-control').type("909900990");
        cy.get('#age').click();
        cy.get('[aria-label="Previous month"]').click().click().click().click().click().click();
        cy.contains("9").click();
        cy.get('#sex').select("Male");
        cy.get('#status').select("UNEMPLOYED");
        cy.get('#educationLevel').select("UNIVERSITY");
        cy.get('.col-md-offset-3 > :nth-child(1) > .form-control').type("zmukera12zmukera12");
        cy.get('.col-md-offset-3 > :nth-child(2) > .form-control').type("zmukera12zmukera12");
        cy.get('#agree').click();
        cy.get('.main-btn').click();

        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input').click();
        cy.contains("Addis Ababa").click();
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input').click();
        cy.get('[class="ng-dropdown-panel ng-star-inserted ng-select-bottom"]').contains("Addis Ababa").click()

        cy.get(':nth-child(4) > .form-control').type("04");
        cy.get(':nth-child(2) > :nth-child(4) > .ng-untouched').type("zmukera12Dad");
        cy.get('.input-group > .ng-untouched').type("912121212");
        cy.get(':nth-child(3) > .col-md-6 > :nth-child(2) > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input').click();
        cy.get('[class="ng-dropdown-panel ng-star-inserted ng-select-bottom"]').contains("3").click();
        cy.get(':nth-child(3) > .col-md-6 > :nth-child(3) > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input').click();
        cy.get('[class="ng-dropdown-panel ng-star-inserted ng-select-bottom"]').contains("4").click();
        cy.get(':nth-child(3) > .col-md-6 > :nth-child(4) > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input').click();
        cy.get('[class="ng-dropdown-panel ng-star-inserted ng-select-bottom"]').contains("3").click();
        cy.get(':nth-child(2) > .main-btn').click();

        cy.wait("@participantRegistration", { timeout: 70000 }).then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200);
            if (xhr.response.statusCode === 200) {
                cy.wait(2000);
                

                // DONT FORGET TO CHANGE BACKEND UID TO 1234 FOR TESTING
                const magic =
                    "http://localhost:4200/confirm/" + xhr.response.body.id + "-" + "1234";
                

                cy.intercept("POST", `http://localhost:3000/api/UserAccounts/confirmEmail`, (req) => {
                    delete req.headers["if-none-match"];
                }).as("validateVerification");
                cy.visit(magic);
                cy.wait("@validateVerification", { timeout: 70000 }).then((xhr) => {
                    expect(xhr.response.statusCode).to.eq(200);
                    
                    cy.wait(2000);
                    cy.signInAsParticipant("zmukera12@gmail.com", "zmukera12zmukera12");
                    
                });
            }
        });


    });
    
});