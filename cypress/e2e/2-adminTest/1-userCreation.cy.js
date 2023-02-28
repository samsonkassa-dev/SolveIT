/// <reference types="Cypress" />

describe('Admin Create Users', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('create solve it team', () => {

        cy.intercept("POST", "http://localhost:3000/api/UserAccounts/register-solveit-team", (req) => {
            delete req.headers["if-none-match"];
        }).as("solveitTeamRegistration");



        cy.signInAsAdmin();
        cy.get('.outline-btn').click();
        cy.get(':nth-child(1) > .input').type("teamMukera")
        cy.get(':nth-child(2) > .input').type("teamMukera")
        cy.get(':nth-child(3) > .input').type("teamMukera")
        cy.get('#sex').select("Male");
        cy.get(':nth-child(5) > .input').type("teamMukera@gmail.com");
        cy.get(':nth-child(6) > .input').type("teamMukera");
        cy.get('.input-group > .input').type("923232323");
        cy.get('#role').select("Staff & Mentor Team");
        cy.get(':nth-child(9) > .input').type("teamMukerateamMukera");
        cy.get(':nth-child(10) > .input').type("teamMukerateamMukera");
        cy.get('.main-btn').click();
        cy.wait("@solveitTeamRegistration", { timeout: 70000 }).then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200);
            if (xhr.response.statusCode === 200) {
                const userId=xhr.response.body.id;
                cy.intercept("POST", "http://localhost:3000/api/UserAccounts/logout-user", (req) => {
                    delete req.headers["if-none-match"];
                }).as("adminLogout");

                cy.get('.nav > :nth-child(10) > :nth-child(1)').trigger("mouseover");
                cy.contains("Logout").click({force: true});

                cy.wait("@adminLogout", { timeout: 70000 }).then((xhr) => {
                    // expect(xhr.response.statusCode).to.eq(200);
                    // cy.signInAsParticipant("zmukera@gmail.com", "zmukerazmukera");
                    cy.wait(2000);

                    const magic =
                        "http://localhost:4200/confirm/" + userId + "-" + "1234";

                    cy.intercept("POST", `http://localhost:3000/api/UserAccounts/confirmEmail`, (req) => {
                        delete req.headers["if-none-match"];
                    }).as("validateVerification");

                    cy.visit(magic);
                    cy.wait("@validateVerification", { timeout: 70000 }).then((xhr) => {
                        expect(xhr.response.statusCode).to.eq(200);

                        cy.wait(2000);
                        cy.signInAsSolveitTeam("teamMukera@gmail.com", "teamMukerateamMukera");

                    });
                });

                // DONT FORGET TO CHANGE BACKEND UID TO 1234 FOR TESTING




            }
        });
    });

    it.only('create solve it mgmt', () => {

        cy.intercept("POST", "http://localhost:3000/api/UserAccounts/register-solveit-mgt", (req) => {
            delete req.headers["if-none-match"];
        }).as("solveitmgmtRegistration");



        cy.signInAsAdmin();
        cy.get('.outline-btn').click();
        cy.get(':nth-child(1) > .input').type("mgmtMukera")
        cy.get(':nth-child(2) > .input').type("mgmtMukera")
        cy.get(':nth-child(3) > .input').type("mgmtMukera")
        cy.get('#sex').select("Male");
        cy.get(':nth-child(5) > .input').type("mgmtMukera@gmail.com");
        cy.get(':nth-child(6) > .input').type("mgmtMukera");
        cy.get('.input-group > .input').type("923232323");
        cy.get('#role').select("Management Team");
        cy.get(':nth-child(9) > .input').type("mgmtMukeramgmtMukera");
        cy.get(':nth-child(10) > .input').type("mgmtMukeramgmtMukera");
        cy.get('.main-btn').click();
        cy.wait("@solveitmgmtRegistration", { timeout: 70000 }).then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200);
            if (xhr.response.statusCode === 200) {
                const userId=xhr.response.body.id;
                cy.intercept("POST", "http://localhost:3000/api/UserAccounts/logout-user", (req) => {
                    delete req.headers["if-none-match"];
                }).as("adminLogout");

                cy.get('.nav > :nth-child(10) > :nth-child(1)').trigger("mouseover");
                cy.contains("Logout").click({force: true});

                cy.wait("@adminLogout", { timeout: 70000 }).then((xhr) => {
                    // expect(xhr.response.statusCode).to.eq(200);
                    // cy.signInAsParticipant("zmukera@gmail.com", "zmukerazmukera");
                    cy.wait(2000);

                    const magic =
                        "http://localhost:4200/confirm/" + userId + "-" + "1234";

                    cy.intercept("POST", `http://localhost:3000/api/UserAccounts/confirmEmail`, (req) => {
                        delete req.headers["if-none-match"];
                    }).as("validateVerification");

                    cy.visit(magic);
                    cy.wait("@validateVerification", { timeout: 70000 }).then((xhr) => {
                        expect(xhr.response.statusCode).to.eq(200);

                        cy.wait(2000);
                        cy.signInAsSolveitMgmt("mgmtMukera@gmail.com", "mgmtMukeramgmtMukera");

                    });
                });

                // DONT FORGET TO CHANGE BACKEND UID TO 1234 FOR TESTING




            }
        });
    });

});