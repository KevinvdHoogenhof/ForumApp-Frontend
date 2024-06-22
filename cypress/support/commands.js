// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForAlert', (message) => {
    return cy.window().then((win) => {
      return new Cypress.Promise((resolve, reject) => {
        const startTime = Date.now();
        const checkAlert = () => {
          const alertMessage = win.document.querySelector('.alert-message');
          if (alertMessage && alertMessage.textContent.includes(message)) {
            resolve();
          } else if (Date.now() - startTime > 4000) {
            reject(new Error(`Timeout waiting for alert with message: ${message}`));
          } else {
            setTimeout(checkAlert, 100);
          }
        };
        checkAlert();
      });
    });
  });