describe('Login Test', () => {
    it('should allow a user to log in', () => {
        // Visit the login page
      cy.visit('http://localhost:3000/login')

      // Fill in the email and password fields
      cy.get('input[type="text"]').type('user@example.com')
      cy.get('input[type="password"]').type('password')

      // Submit the form
      cy.get('form').submit()
      cy.url().should('not.include', '/login');
    })
  })